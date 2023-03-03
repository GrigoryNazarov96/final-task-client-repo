import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Link, Typography } from "@mui/material";
import { getSearchResults } from "../requests/searchRequests";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchString = location.pathname.split("/")[2];
  const [results, setResults] = useState([]);

  useEffect(() => {
    getSearchResults(searchString).then((data) => setResults(data));
  }, [searchString]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      {results.map((result) => (
        <Box key={result._id}>
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/items/${result._id}`)}
          >
            {result.name}
          </Link>
        </Box>
      ))}
      {!results.length && <Typography>No results</Typography>}
    </Container>
  );
};

export default SearchResults;
