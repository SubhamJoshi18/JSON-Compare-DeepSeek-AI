import { useState, useEffect, useRef } from "react";
import {
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import { BACKEND_URL } from "./constant/modules.constant";

const description = {
  Description: "Description",
  added: "Fields present in JSON 2 but not in JSON 1.",
  removed: "Fields present in JSON 1 but not in JSON 2.",
  modified:
    "Fields with different values, showing the previous and current values.",
};

function App() {
  const [jsonData1, setJsonData1] = useState(null);
  const [jsonData2, setJsonData2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comparisonResult, setComparisonResult] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const textRef = useRef<string>(""); // Ref for text to avoid unnecessary rerenders

  const handleFileChange = (e: any, fileIndex: number) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as any);
          if (fileIndex === 1) {
            setJsonData1(json);
          } else {
            setJsonData2(json);
          }
        } catch (err) {
          setError("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid JSON file");
    }
  };

  const handleCompare = async () => {
    if (!jsonData1 || !jsonData2) {
      setError("Please upload both JSON files first");
      return;
    }

    setLoading(true);
    setError(""); // Reset error

    const formData = new FormData();
    formData.append("json1", JSON.stringify(jsonData1));
    formData.append("json2", JSON.stringify(jsonData2));

    try {
      const response = await axios.post(
        BACKEND_URL + "/compare-json",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (
        response.data &&
        response.data.data &&
        response.data.data.deepseekResponse
      ) {
        const result = response.data.data.deepseekResponse;
        setComparisonResult(result);
        animateText(JSON.stringify(result, null, 2)); // Start animation with the result
      } else {
        setError("Unexpected response structure from backend");
      }
    } catch (err: any) {
      setError(
        "Error during comparison: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false); // Always set loading to false after completion
    }
  };

  const animateText = (text: string = "") => {
    let i = 0;
    textRef.current = ""; // Reset the text before starting animation
    const intervalId = setInterval(() => {
      textRef.current += text[i];
      setDisplayedText(textRef.current); // Update state with the current value
      i += 1;
      if (i === text.length) {
        clearInterval(intervalId);
      }
    }, 20);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#1b1b1b",
        padding: 2,
        position: "relative",
      }}
    >
      {/* Static Notice at Top Right */}
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#2a2a2a",
          color: "#39ff14",
          padding: "20px", // Increased padding for better spacing
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 255, 0, 0.5)",
          fontFamily: "'Roboto', sans-serif", // Apply the Roboto font
          fontWeight: "500", // Set a medium weight
          textAlign: "left", // Align text to the left for better readability
        }}
        className="fadeInAnimation"
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "20px", // Adjust font size for h6
            marginBottom: "8px", // Space between the elements
          }}
        >
          {description.Description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px", // Increase font size for better readability
            lineHeight: "1.6",
          }}
        >
          <span
            style={{
              fontWeight: "bold", // Makes text bold
              fontSize: "16px", // Ensures consistent font size
              color: "#39ff14", // Keeps the green color consistent with your theme
            }}
          >
            Added:
          </span>
          &nbsp; {/* Non-breaking space */}
          {description.added}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginTop: "4px", // Add a little space between paragraphs
          }}
        >
          <span
            style={{
              fontWeight: "bold", // Makes text bold
              fontSize: "16px", // Ensures consistent font size
              color: "#39ff14", // Keeps the green color consistent with your theme
            }}
          >
            Removed:
          </span>
          &nbsp; {/* Non-breaking space */}
          {description.removed}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginTop: "4px", // Add a little space between paragraphs
          }}
        >
          <span
            style={{
              fontWeight: "bold", // Makes text bold
              fontSize: "16px", // Ensures consistent font size
              color: "#39ff14", // Keeps the green color consistent with your theme
            }}
          >
            Modified:
          </span>
          &nbsp; {/* Non-breaking space */}
          {description.modified}
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", padding: "20px" }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#39ff14" }}>
            JSON Compare AI
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#2a2a2a",
              borderRadius: "10px",
              boxShadow: "0px 0px 20px 0px rgba(0, 255, 0, 0.5)",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "#39ff14" }}>
              Upload JSON Files
            </Typography>

            <Button
              variant="contained"
              component="label"
              color="primary"
              startIcon={<UploadFile />}
              sx={{
                backgroundColor: "#39ff14",
                color: "#000",
                ":hover": {
                  backgroundColor: "#00b300",
                },
              }}
            >
              Upload JSON File 1
              <input
                type="file"
                accept=".json"
                hidden
                onChange={(e) => handleFileChange(e, 1)}
              />
            </Button>
            {jsonData1 && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1" sx={{ color: "#39ff14" }}>
                  File 1 loaded successfully!
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              component="label"
              color="primary"
              startIcon={<UploadFile />}
              sx={{
                backgroundColor: "#39ff14",
                color: "#000",
                ":hover": {
                  backgroundColor: "#00b300",
                },
                marginLeft: "10px",
                marginTop: "4px",
              }}
            >
              Upload JSON File 2
              <input
                type="file"
                accept=".json"
                hidden
                onChange={(e) => handleFileChange(e, 2)}
              />
            </Button>
            {jsonData2 && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1" sx={{ color: "#39ff14" }}>
                  File 2 loaded successfully!
                </Typography>
              </Box>
            )}

            {/* Compare Button */}
            <Box sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCompare}
                disabled={loading}
                sx={{
                  backgroundColor: "#ff5733",
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "#c70039",
                  },
                }}
              >
                Compare
              </Button>
            </Box>

            {/* Loading State */}
            {loading && (
              <Box sx={{ marginTop: 3 }}>
                <CircularProgress color="secondary" />
              </Box>
            )}

            {/* Error Message */}
            {error && (
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              </Box>
            )}

            {/* Comparison Result */}
            {comparisonResult && (
              <Box sx={{ marginTop: 3, maxWidth: "100%", marginRight: "10px" }}>
                <Typography variant="h6" sx={{ color: "#39ff14" }}>
                  Comparison Result
                </Typography>
                <pre
                  className="typewriter"
                  style={{
                    backgroundColor: "#1e1e1e",
                    color: "#39ff14",
                    padding: "10px",
                    borderRadius: "5px",
                    textAlign: "left",
                    whiteSpace: "pre-wrap",
                    overflow: "auto", // Ensure overflow is handled
                    width: "100%",
                  }}
                >
                  {displayedText}
                </pre>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
