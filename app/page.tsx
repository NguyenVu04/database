'use client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import { FaFacebook, FaTwitter, FaGlobe } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Slider from "react-slick";
import Image from "next/image";

export default function App() {
  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      {/* Gradient Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #2563eb, #9333ea)",
          padding: "10px 0",
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <FaGlobe />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TourismApp
          </Typography>
          <Button color="inherit" href="/signin">
            Sign In
          </Button>
          <Button color="inherit" href="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Description */}
      <Container maxWidth="md" sx={{ textAlign: "center", padding: "50px 0" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to TourismWebsite
        </Typography>
        <Typography variant="body1">
          Discover breathtaking destinations, plan your dream vacations, and
          explore the world with us. From serene beaches to adventurous
          mountains, we have something for everyone!
        </Typography>
      </Container>

      {/* Carousel */}
      <Container maxWidth="lg" sx={{ marginBottom: "40px" }}>
        <Slider {...carouselSettings}>
          <Box>
            <Image
              src="/beach.jpg"
              alt="Beautiful Beach"
              width={3840}
              height={2160}
              layout="responsive"
            />
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Beautiful Beach
            </Typography>
          </Box>
          <Box>
            <Image
              src="/mountain.jpg"
              alt="Mountain Adventure"
              width={3840}
              height={2160}
              layout="responsive"
            />
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Mountain Adventure
            </Typography>
          </Box>
          <Box>
            <Image
              src="/city.jpg"
              alt="City Life"
              width={3840}
              height={2160}
              layout="responsive"
            />
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              City Life
            </Typography>
          </Box>
        </Slider>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#f4f4f4",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Box>
          <IconButton color="primary" href="https://facebook.com">
            <FaFacebook />
          </IconButton>
          <IconButton color="primary" href="https://zalo.me">
            <SiZalo />
          </IconButton>
          <IconButton color="primary" href="https://twitter.com">
            <FaTwitter />
          </IconButton>
        </Box>
        <Typography variant="body2">
          &copy; 2024 TourismApp. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};