import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { uploadImage } from "../supabaseService";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f4f8;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin-bottom: 25px;
  color: #333;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1.8px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px 15px;
  background-color: #4a90e2;
  color: white;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px;
  width: 100%;

  &:hover {
    background-color: #357abd;
  }
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ddd;
  cursor: pointer;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const LoginText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 0.95rem;
  color: #555;
`;

const LoginLink = styled(Link)`
  color: #4a90e2;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #357abd;
  }
`;

const PlaceholderIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: white;
  background-color: #ccc;
`;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileUpload").click();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), { name, email, imageUrl });

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Create Your Account</Title>
        <StyledForm onSubmit={handleRegister}>
          <ImagePreviewContainer onClick={handleImageClick}>
            {imagePreview ? (
              <img src={imagePreview} alt="Profile Preview" />
            ) : (
              <PlaceholderIcon>+</PlaceholderIcon>
            )}
          </ImagePreviewContainer>
          <HiddenFileInput
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Register</Button>
        </StyledForm>
        <LoginText>
          Already have an account? <LoginLink to="/login">Login here</LoginLink>
        </LoginText>
      </FormWrapper>
    </Container>
  );
}

export default Register;
