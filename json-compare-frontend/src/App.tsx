import { useState } from "react";
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

function App() {
  const [jsonData1, setJsonData1] = useState(null);
  const [jsonData2, setJsonData2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comparisonResult, setComparisonResult] = useState(null);

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
    setError("");

    const formData = new FormData();
    formData.append("json", jsonData1);
    formData.append("json", jsonData2);

    try {
      const response = await axios.post(BACKEND_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = await response.data;
      setComparisonResult(result);
    } catch (err) {
      setError("Error during comparison");
    } finally {
      setLoading(false);
    }
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
      }}
    >
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

            {/* JSON File 1 Upload */}
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
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6" sx={{ color: "#39ff14" }}>
                  Comparison Result
                </Typography>
                <pre
                  style={{
                    backgroundColor: "#1e1e1e",
                    color: "#39ff14",
                    padding: "10px",
                    borderRadius: "5px",
                    textAlign: "left",
                  }}
                >
                  {JSON.stringify(comparisonResult, null, 2)}
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
