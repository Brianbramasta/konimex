/**
 * API Utility Functions
 * Handles all API requests with dummy data for now
 * When real API is ready, just update the BASE_URL and endpoints
 */

import axios from 'axios';

// Base URL for API requests - change this when real API is available
const BASE_URL = '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Dummy data for authentication
const dummyUsers = [
  { 
    id: 1, 
    email: 'admin@konimex.com', 
    password: 'admin123', 
    name: 'Admin Konimex',
    role: 'admin',
    branches: [1, 2, 3] // User has access to multiple branches
  },
  { 
    id: 2, 
    email: 'user@konimex.com', 
    password: 'user123', 
    name: 'User Konimex',
    role: 'user',
    branches: [1] // User has access to only one branch
  },
];

// Dummy data for branches
const dummyBranches = [
  { id: 1, name: 'Jakarta', address: 'Jl. Jakarta No. 123' },
  { id: 2, name: 'Surabaya', address: 'Jl. Surabaya No. 456' },
  { id: 3, name: 'Bandung', address: 'Jl. Bandung No. 789' },
];

/**
 * Authentication API
 */
export const authAPI = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Promise with user data and token
   */
  login: async (email, password) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching email and password
    const user = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      // Generate dummy token
      const token = `dummy-token-${user.id}-${Date.now()}`;
      
      // Return user data and token
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          branches: user.branches,
        },
        token,
      };
    } else {
      // Throw error if credentials are invalid
      throw new Error('Invalid email or password');
    }
  },
  
  /**
   * Get current user data
   * @returns {Promise} - Promise with user data
   */
  getCurrentUser: async () => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    // Extract user ID from token (in real app, would decode JWT)
    const userId = parseInt(token.split('-')[2]);
    
    // Find user with matching ID
    const user = dummyUsers.find((user) => user.id === userId);
    
    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        branches: user.branches,
      };
    } else {
      throw new Error('User not found');
    }
  },
  
  /**
   * Logout user
   */
  logout: async () => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    return { success: true };
  },
};

/**
 * Branch API
 */
export const branchAPI = {
  /**
   * Get all branches
   * @returns {Promise} - Promise with branches data
   */
  getAllBranches: async () => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return dummyBranches;
  },
  
  /**
   * Get branches by user ID
   * @param {number} userId - User ID
   * @returns {Promise} - Promise with branches data
   */
  getBranchesByUserId: async (userId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user with matching ID
    const user = dummyUsers.find((user) => user.id === userId);
    
    if (user) {
      // Filter branches by user's branch IDs
      const userBranches = dummyBranches.filter((branch) => 
        user.branches.includes(branch.id)
      );
      
      return userBranches;
    } else {
      throw new Error('User not found');
    }
  },
  
  /**
   * Get branch by ID
   * @param {number} branchId - Branch ID
   * @returns {Promise} - Promise with branch data
   */
  getBranchById: async (branchId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find branch with matching ID
    const branch = dummyBranches.find((branch) => branch.id === branchId);
    
    if (branch) {
      return branch;
    } else {
      throw new Error('Branch not found');
    }
  },
};

// Export default API client for direct use
export default apiClient;