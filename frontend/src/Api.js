import axios from "axios";

const BASE_URL = "http://localhost:3000/posts";

// Utility function to handle API responses
async function handleResponse(request) {
  try {
    const response = await request;
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error(error.response?.data?.message || "An error occurred while processing the request");
  }
}

// Get all posts
export async function getAllPosts() {
  return handleResponse(axios.get(BASE_URL));
}

// Get a single post by ID
export async function getPost(id) {
  if (!id) throw new Error("Post ID is required");
  return handleResponse(axios.get(`${BASE_URL}/${id}`));
}

// Create a new post
export async function createPost(postObject) {
  if (!postObject || typeof postObject !== "object") throw new Error("Invalid post object");
  return handleResponse(axios.post(BASE_URL, postObject));
}

// Update a post by ID
export async function updatePost(id, postObject) {
  if (!id || !postObject) throw new Error("Post ID and post object are required");
  return handleResponse(axios.put(`${BASE_URL}/${id}`, postObject));
}

// Delete a post by ID
export async function deletePost(id) {
  if (!id) throw new Error("Post ID is required");
  const response = await handleResponse(axios.delete(`${BASE_URL}/${id}`));
  console.log("Post deleted successfully");
  return response;
}
