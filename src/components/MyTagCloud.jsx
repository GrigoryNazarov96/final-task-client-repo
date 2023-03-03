import React from "react";
import { useNavigate } from "react-router-dom";
import { TagCloud } from "react-tagcloud";

const MyTagCloud = () => {
  const navigate = useNavigate();
  const data = [
    { value: "Books", count: 38 },
    { value: "Alcohol", count: 30 },
    { value: "Postmarks", count: 28 },
    { value: "Vintage", count: 25 },
    { value: "Cellphones", count: 33 },
    { value: "Models", count: 18 },
    { value: "Medals", count: 20 },
    { value: "Vinyls", count: 30 },
    { value: "Pins", count: 15 },
  ];

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={data}
      onClick={(tag) => navigate(`/search/${tag.value}`)}
      className="tag-cloud"
    />
  );
};

export default MyTagCloud;
