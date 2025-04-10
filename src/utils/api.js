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
  { id: 1, name: 'Jakarta', address: 'Jl. Jakarta No. 123', isActive: true, code: 'JKT' },
  { id: 2, name: 'Surabaya', address: 'Jl. Surabaya No. 456', isActive: true, code: 'SBY' },
  { id: 3, name: 'Bandung', address: 'Jl. Bandung No. 789', isActive: true, code: 'BDG' },
];

// Dummy data for roles
const dummyRoles = [
  { 
    id: 1, 
    name: 'Super Admin', 
    isActive: true,
    permissions: {
      branches: { view: true, add: true, edit: true, delete: true },
      roles: { view: true, add: true, edit: true, delete: true },
      employees: { view: true, add: true, edit: true, delete: true },
      hotels: { view: true, add: true, edit: true, delete: true },
      roomTypes: { view: true, add: true, edit: true, delete: true },
      tickets: { view: true, add: true, edit: true, delete: true },
      vehicleTypes: { view: true, add: true, edit: true, delete: true },
      vehicles: { view: true, add: true, edit: true, delete: true },
      plafonds: { view: true, add: true, edit: true, delete: true },
      messRooms: { view: true, add: true, edit: true, delete: true },
      cities: { view: true, add: true, edit: true, delete: true },
      orders: { view: true, add: true, edit: true, delete: true, approve: { domestic: true, international: true }, setBiaya: true },
    }
  },
  { 
    id: 2, 
    name: 'Admin', 
    isActive: true,
    permissions: {
      branches: { view: true, add: false, edit: false, delete: false },
      roles: { view: true, add: false, edit: false, delete: false },
      employees: { view: true, add: true, edit: true, delete: false },
      hotels: { view: true, add: true, edit: true, delete: false },
      roomTypes: { view: true, add: true, edit: true, delete: false },
      tickets: { view: true, add: true, edit: true, delete: false },
      vehicleTypes: { view: true, add: true, edit: true, delete: false },
      vehicles: { view: true, add: true, edit: true, delete: false },
      plafonds: { view: true, add: false, edit: false, delete: false },
      messRooms: { view: true, add: true, edit: true, delete: false },
      cities: { view: true, add: true, edit: true, delete: false },
      orders: { view: true, add: true, edit: true, delete: false, approve: { domestic: true, international: false }, setBiaya: true },
    }
  },
  { 
    id: 3, 
    name: 'User', 
    isActive: true,
    permissions: {
      branches: { view: true, add: false, edit: false, delete: false },
      roles: { view: false, add: false, edit: false, delete: false },
      employees: { view: true, add: false, edit: false, delete: false },
      hotels: { view: true, add: false, edit: false, delete: false },
      roomTypes: { view: true, add: false, edit: false, delete: false },
      tickets: { view: true, add: false, edit: false, delete: false },
      vehicleTypes: { view: true, add: false, edit: false, delete: false },
      vehicles: { view: true, add: false, edit: false, delete: false },
      plafonds: { view: false, add: false, edit: false, delete: false },
      messRooms: { view: true, add: false, edit: false, delete: false },
      cities: { view: true, add: false, edit: false, delete: false },
      orders: { view: true, add: true, edit: false, delete: false, approve: { domestic: false, international: false }, setBiaya: false },
    }
  },
  { 
    id: 4, 
    name: 'Driver', 
    isActive: true,
    permissions: {
      branches: { view: false, add: false, edit: false, delete: false },
      roles: { view: false, add: false, edit: false, delete: false },
      employees: { view: false, add: false, edit: false, delete: false },
      hotels: { view: false, add: false, edit: false, delete: false },
      roomTypes: { view: false, add: false, edit: false, delete: false },
      tickets: { view: false, add: false, edit: false, delete: false },
      vehicleTypes: { view: false, add: false, edit: false, delete: false },
      vehicles: { view: false, add: false, edit: false, delete: false },
      plafonds: { view: false, add: false, edit: false, delete: false },
      messRooms: { view: false, add: false, edit: false, delete: false },
      cities: { view: false, add: false, edit: false, delete: false },
      orders: { view: false, add: false, edit: false, delete: false, approve: { domestic: false, international: false }, setBiaya: false },
      driverSchedule: { view: true, update: true },
    }
  },
];

// Dummy data for employees
const dummyEmployees = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@konimex.com',
    gender: 'male',
    branchId: 1,
    roleId: 1,
    hasLoginAccess: true,
    isDriver: false,
    whatsappNumber: null,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@konimex.com',
    gender: 'female',
    branchId: 1,
    roleId: 2,
    hasLoginAccess: true,
    isDriver: false,
    whatsappNumber: null,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  { 
    id: 3, 
    name: 'Bob Driver', 
    email: 'bob@konimex.com',
    gender: 'male',
    branchId: 1,
    roleId: 4,
    hasLoginAccess: true,
    isDriver: true,
    whatsappNumber: '+6281234567890',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
];

// Dummy data for hotels
const dummyHotels = [
  { id: 1, code: 'HTL001', name: 'Grand Hotel Jakarta', isActive: true },
  { id: 2, code: 'HTL002', name: 'Surabaya Luxury Hotel', isActive: true },
  { id: 3, code: 'HTL003', name: 'Bandung Hilltop Resort', isActive: true },
  { id: 4, code: 'HTL004', name: 'Old Hotel', isActive: false },
];

// Dummy data for room types
const dummyRoomTypes = [
  { id: 1, code: 'STD', type: 'Standard', hotelIds: [1, 2, 3], price: 500000, capacity: 2, isActive: true },
  { id: 2, code: 'DLX', type: 'Deluxe', hotelIds: [1, 2], price: 750000, capacity: 2, isActive: true },
  { id: 3, code: 'SUT', type: 'Suite', hotelIds: [1], price: 1200000, capacity: 4, isActive: true },
  { id: 4, code: 'FAM', type: 'Family', hotelIds: [3], price: 900000, capacity: 4, isActive: true },
];

// Dummy data for tickets
const dummyTickets = [
  { id: 1, code: 'TKT001', name: 'Economy Flight', isActive: true },
  { id: 2, code: 'TKT002', name: 'Business Flight', isActive: true },
  { id: 3, code: 'TKT003', name: 'Train Ticket', isActive: true },
  { id: 4, code: 'TKT004', name: 'Bus Ticket', isActive: true },
];

// Dummy data for vehicle types
const dummyVehicleTypes = [
  { id: 1, code: 'SDN', type: 'Sedan', isActive: true },
  { id: 2, code: 'SUV', type: 'SUV', isActive: true },
  { id: 3, code: 'MPV', type: 'MPV', isActive: true },
  { id: 4, code: 'BUS', type: 'Bus', isActive: false },
];

// Dummy data for vehicles
const dummyVehicles = [
  { id: 1, branchId: 1, vehicleTypeId: 1, plateNumber: 'B 1234 KNX', isActive: true },
  { id: 2, branchId: 1, vehicleTypeId: 3, plateNumber: 'B 5678 KNX', isActive: true },
  { id: 3, branchId: 2, vehicleTypeId: 2, plateNumber: 'L 9012 KNX', isActive: true },
  { id: 4, branchId: 3, vehicleTypeId: 1, plateNumber: 'D 3456 KNX', isActive: true },
];

// Dummy data for plafonds
const dummyPlafonds = [
  { 
    id: 1, 
    roleId: 2, 
    type: 'hotel', 
    effectiveDate: '2023-01-01', 
    amount: 750000, 
    isActive: true,
    history: [
      { date: '2022-01-01', amount: 500000 },
      { date: '2023-01-01', amount: 750000 },
    ]
  },
  { 
    id: 2, 
    roleId: 2, 
    type: 'ticket', 
    effectiveDate: '2023-01-01', 
    amount: 1500000, 
    isActive: true,
    history: [
      { date: '2022-01-01', amount: 1000000 },
      { date: '2023-01-01', amount: 1500000 },
    ]
  },
  { 
    id: 3, 
    roleId: 3, 
    type: 'hotel', 
    effectiveDate: '2023-01-01', 
    amount: 500000, 
    isActive: true,
    history: [
      { date: '2022-01-01', amount: 350000 },
      { date: '2023-01-01', amount: 500000 },
    ]
  },
  { 
    id: 4, 
    roleId: 3, 
    type: 'ticket', 
    effectiveDate: '2023-01-01', 
    amount: 1000000, 
    isActive: true,
    history: [
      { date: '2022-01-01', amount: 750000 },
      { date: '2023-01-01', amount: 1000000 },
    ]
  },
];

// Dummy data for mess rooms
const dummyMessRooms = [
  { id: 1, branchId: 1, roomNumber: '101', gender: 'male', capacity: 4, isActive: true },
  { id: 2, branchId: 1, roomNumber: '102', gender: 'female', capacity: 4, isActive: true },
  { id: 3, branchId: 2, roomNumber: '101', gender: 'male', capacity: 2, isActive: true },
  { id: 4, branchId: 2, roomNumber: '102', gender: 'female', capacity: 2, isActive: true },
  { id: 5, branchId: 3, roomNumber: '101', gender: 'male', capacity: 3, isActive: true },
];

// Dummy data for cities
const dummyCities = [
  { id: 1, code: 'JKT', name: 'Jakarta', isActive: true },
  { id: 2, code: 'SBY', name: 'Surabaya', isActive: true },
  { id: 3, code: 'BDG', name: 'Bandung', isActive: true },
  { id: 4, code: 'SMG', name: 'Semarang', isActive: true },
  { id: 5, code: 'DPS', name: 'Denpasar', isActive: true },
];

// Dummy data for suppliers (optional)
const dummySuppliers = [
  { id: 1, code: 'SUP001', name: 'Travel Agent A', isActive: true },
  { id: 2, code: 'SUP002', name: 'Hotel Supplier B', isActive: true },
  { id: 3, code: 'SUP003', name: 'Transportation C', isActive: true },
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
   * @param {Object} filters - Optional filters (isActive, search)
   * @returns {Promise} - Promise with branches data
   */
  getAllBranches: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredBranches = [...dummyBranches];
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredBranches = filteredBranches.filter(branch => branch.isActive === filters.isActive);
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredBranches = filteredBranches.filter(branch => 
        branch.name.toLowerCase().includes(searchLower) ||
        branch.code.toLowerCase().includes(searchLower) ||
        branch.address.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredBranches;
  },
  
  /**
   * Get branches by user ID
   * @param {number} userId - User ID
   * @param {Object} filters - Optional filters (isActive, search)
   * @returns {Promise} - Promise with branches data
   */
  getBranchesByUserId: async (userId, filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user with matching ID
    const user = dummyUsers.find((user) => user.id === userId);
    
    if (user) {
      // Filter branches by user's branch IDs
      let userBranches = dummyBranches.filter((branch) => 
        user.branches.includes(branch.id)
      );
      
      // Apply active filter if provided
      if (filters.isActive !== undefined) {
        userBranches = userBranches.filter(branch => branch.isActive === filters.isActive);
      }
      
      // Apply search filter if provided
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        userBranches = userBranches.filter(branch => 
          branch.name.toLowerCase().includes(searchLower) ||
          branch.code.toLowerCase().includes(searchLower) ||
          branch.address.toLowerCase().includes(searchLower)
        );
      }
      
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
  
  /**
   * Create a new branch
   * @param {Object} branchData - Branch data
   * @returns {Promise} - Promise with created branch data
   */
  createBranch: async (branchData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check if code already exists
    const codeExists = dummyBranches.some(branch => 
      branch.code.toLowerCase() === branchData.code.toLowerCase()
    );
    
    if (codeExists) {
      throw new Error('Branch code already exists');
    }
    
    // Create new branch with ID
    const newBranch = {
      id: dummyBranches.length + 1,
      ...branchData,
      isActive: branchData.isActive !== undefined ? branchData.isActive : true,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyBranches.push(newBranch);
    
    return newBranch;
  },
  
  /**
   * Update branch by ID
   * @param {number} branchId - Branch ID
   * @param {Object} branchData - Updated branch data
   * @returns {Promise} - Promise with updated branch data
   */
  updateBranch: async (branchId, branchData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find branch index
    const branchIndex = dummyBranches.findIndex(branch => branch.id === branchId);
    
    if (branchIndex === -1) {
      throw new Error('Branch not found');
    }
    
    // Check if code already exists (excluding current branch)
    if (branchData.code) {
      const codeExists = dummyBranches.some(branch => 
        branch.id !== branchId && 
        branch.code.toLowerCase() === branchData.code.toLowerCase()
      );
      
      if (codeExists) {
        throw new Error('Branch code already exists');
      }
    }
    
    // Update branch
    const updatedBranch = {
      ...dummyBranches[branchIndex],
      ...branchData,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyBranches[branchIndex] = updatedBranch;
    
    return updatedBranch;
  },
  
  /**
   * Delete branch by ID
   * @param {number} branchId - Branch ID
   * @returns {Promise} - Promise with success status
   */
  deleteBranch: async (branchId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find branch index
    const branchIndex = dummyBranches.findIndex(branch => branch.id === branchId);
    
    if (branchIndex === -1) {
      throw new Error('Branch not found');
    }
    
    // Check for related data (employees, vehicles, mess rooms)
    const hasEmployees = dummyEmployees.some(employee => employee.branchId === branchId);
    const hasVehicles = dummyVehicles.some(vehicle => vehicle.branchId === branchId);
    const hasMessRooms = dummyMessRooms.some(room => room.branchId === branchId);
    
    if (hasEmployees || hasVehicles || hasMessRooms) {
      throw new Error('Cannot delete branch with related data');
    }
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyBranches.splice(branchIndex, 1);
    
    return { success: true };
  },
};

/**
 * Role API
 */
export const roleAPI = {
  /**
   * Get all roles
   * @param {Object} filters - Optional filters (isActive, search)
   * @returns {Promise} - Promise with roles data
   */
  getAllRoles: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredRoles = [...dummyRoles];
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredRoles = filteredRoles.filter(role => role.isActive === filters.isActive);
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredRoles = filteredRoles.filter(role => 
        role.name.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredRoles;
  },
  
  /**
   * Get role by ID
   * @param {number} roleId - Role ID
   * @returns {Promise} - Promise with role data
   */
  getRoleById: async (roleId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find role with matching ID
    const role = dummyRoles.find(role => role.id === roleId);
    
    if (role) {
      return role;
    } else {
      throw new Error('Role not found');
    }
  },
  
  /**
   * Create a new role
   * @param {Object} roleData - Role data
   * @returns {Promise} - Promise with created role data
   */
  createRole: async (roleData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Create new role with ID
    const newRole = {
      id: dummyRoles.length + 1,
      ...roleData,
      isActive: roleData.isActive !== undefined ? roleData.isActive : true,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyRoles.push(newRole);
    
    return newRole;
  },
  
  /**
   * Update role by ID
   * @param {number} roleId - Role ID
   * @param {Object} roleData - Updated role data
   * @returns {Promise} - Promise with updated role data
   */
  updateRole: async (roleId, roleData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find role index
    const roleIndex = dummyRoles.findIndex(role => role.id === roleId);
    
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }
    
    // Update role
    const updatedRole = {
      ...dummyRoles[roleIndex],
      ...roleData,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyRoles[roleIndex] = updatedRole;
    
    return updatedRole;
  },
  
  /**
   * Delete role by ID
   * @param {number} roleId - Role ID
   * @returns {Promise} - Promise with success status
   */
  deleteRole: async (roleId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find role index
    const roleIndex = dummyRoles.findIndex(role => role.id === roleId);
    
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }
    
    // Check for related data (employees, plafonds)
    const hasEmployees = dummyEmployees.some(employee => employee.roleId === roleId);
    const hasPlafonds = dummyPlafonds.some(plafond => plafond.roleId === roleId);
    
    if (hasEmployees || hasPlafonds) {
      throw new Error('Cannot delete role with related data');
    }
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyRoles.splice(roleIndex, 1);
    
    return { success: true };
  },
};

/**
 * Employee API
 */
export const employeeAPI = {
  /**
   * Get all employees
   * @param {Object} filters - Optional filters (branchId, isActive, isDriver, search)
   * @returns {Promise} - Promise with employees data
   */
  getAllEmployees: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredEmployees = [...dummyEmployees];
    
    // Apply branch filter if provided
    if (filters.branchId) {
      filteredEmployees = filteredEmployees.filter(employee => 
        employee.branchId === filters.branchId
      );
    }
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredEmployees = filteredEmployees.filter(employee => 
        employee.isActive === filters.isActive
      );
    }
    
    // Apply driver filter if provided
    if (filters.isDriver !== undefined) {
      filteredEmployees = filteredEmployees.filter(employee => 
        employee.isDriver === filters.isDriver
      );
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredEmployees = filteredEmployees.filter(employee => 
        employee.name.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredEmployees;
  },
  
  /**
   * Get employee by ID
   * @param {number} employeeId - Employee ID
   * @returns {Promise} - Promise with employee data
   */
  getEmployeeById: async (employeeId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find employee with matching ID
    const employee = dummyEmployees.find(employee => employee.id === employeeId);
    
    if (employee) {
      return employee;
    } else {
      throw new Error('Employee not found');
    }
  },
  
  /**
   * Create a new employee
   * @param {Object} employeeData - Employee data
   * @returns {Promise} - Promise with created employee data
   */
  createEmployee: async (employeeData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employeeData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Validate WhatsApp number for drivers
    if (employeeData.isDriver && !employeeData.whatsappNumber) {
      throw new Error('WhatsApp number is required for drivers');
    }
    
    // Create new employee with ID and timestamps
    const now = new Date().toISOString();
    const newEmployee = {
      id: dummyEmployees.length + 1,
      ...employeeData,
      isActive: employeeData.isActive !== undefined ? employeeData.isActive : true,
      createdAt: now,
      updatedAt: now,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyEmployees.push(newEmployee);
    
    return newEmployee;
  },
  
  /**
   * Update employee by ID
   * @param {number} employeeId - Employee ID
   * @param {Object} employeeData - Updated employee data
   * @returns {Promise} - Promise with updated employee data
   */
  updateEmployee: async (employeeId, employeeData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find employee index
    const employeeIndex = dummyEmployees.findIndex(employee => employee.id === employeeId);
    
    if (employeeIndex === -1) {
      throw new Error('Employee not found');
    }
    
    // Validate email format if provided
    if (employeeData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(employeeData.email)) {
        throw new Error('Invalid email format');
      }
    }
    
    // Validate WhatsApp number for drivers
    const willBeDriver = employeeData.isDriver !== undefined 
      ? employeeData.isDriver 
      : dummyEmployees[employeeIndex].isDriver;
      
    const whatsappNumber = employeeData.whatsappNumber !== undefined 
      ? employeeData.whatsappNumber 
      : dummyEmployees[employeeIndex].whatsappNumber;
      
    if (willBeDriver && !whatsappNumber) {
      throw new Error('WhatsApp number is required for drivers');
    }
    
    // Update employee with new timestamp
    const updatedEmployee = {
      ...dummyEmployees[employeeIndex],
      ...employeeData,
      updatedAt: new Date().toISOString(),
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyEmployees[employeeIndex] = updatedEmployee;
    
    return updatedEmployee;
  },
  
  /**
   * Delete employee by ID (soft delete by setting isActive to false)
   * @param {number} employeeId - Employee ID
   * @returns {Promise} - Promise with success status
   */
  deleteEmployee: async (employeeId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find employee index
    const employeeIndex = dummyEmployees.findIndex(employee => employee.id === employeeId);
    
    if (employeeIndex === -1) {
      throw new Error('Employee not found');
    }
    
    // Soft delete by setting isActive to false
    dummyEmployees[employeeIndex] = {
      ...dummyEmployees[employeeIndex],
      isActive: false,
      updatedAt: new Date().toISOString(),
    };
    
    return { success: true };
  },
};

/**
 * Hotel API
 */
export const hotelAPI = {
  /**
   * Get all hotels
   * @param {Object} filters - Optional filters (isActive, search)
   * @returns {Promise} - Promise with hotels data
   */
  getAllHotels: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredHotels = [...dummyHotels];
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredHotels = filteredHotels.filter(hotel => hotel.isActive === filters.isActive);
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchLower) ||
        hotel.code.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredHotels;
  },
  
  /**
   * Get hotel by ID
   * @param {number} hotelId - Hotel ID
   * @returns {Promise} - Promise with hotel data
   */
  getHotelById: async (hotelId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find hotel with matching ID
    const hotel = dummyHotels.find(hotel => hotel.id === hotelId);
    
    if (hotel) {
      return hotel;
    } else {
      throw new Error('Hotel not found');
    }
  },
  
  /**
   * Create a new hotel
   * @param {Object} hotelData - Hotel data
   * @returns {Promise} - Promise with created hotel data
   */
  createHotel: async (hotelData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check if code already exists
    const codeExists = dummyHotels.some(hotel => 
      hotel.code.toLowerCase() === hotelData.code.toLowerCase()
    );
    
    if (codeExists) {
      throw new Error('Hotel code already exists');
    }
    
    // Create new hotel with ID
    const newHotel = {
      id: dummyHotels.length + 1,
      ...hotelData,
      isActive: hotelData.isActive !== undefined ? hotelData.isActive : true,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyHotels.push(newHotel);
    
    return newHotel;
  },
  
  /**
   * Update hotel by ID
   * @param {number} hotelId - Hotel ID
   * @param {Object} hotelData - Updated hotel data
   * @returns {Promise} - Promise with updated hotel data
   */
  updateHotel: async (hotelId, hotelData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find hotel index
    const hotelIndex = dummyHotels.findIndex(hotel => hotel.id === hotelId);
    
    if (hotelIndex === -1) {
      throw new Error('Hotel not found');
    }
    
    // Check if code already exists (excluding current hotel)
    if (hotelData.code) {
      const codeExists = dummyHotels.some(hotel => 
        hotel.id !== hotelId && 
        hotel.code.toLowerCase() === hotelData.code.toLowerCase()
      );
      
      if (codeExists) {
        throw new Error('Hotel code already exists');
      }
    }
    
    // Update hotel
    const updatedHotel = {
      ...dummyHotels[hotelIndex],
      ...hotelData,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyHotels[hotelIndex] = updatedHotel;
    
    return updatedHotel;
  },
  
  /**
   * Delete hotel by ID
   * @param {number} hotelId - Hotel ID
   * @returns {Promise} - Promise with success status
   */
  deleteHotel: async (hotelId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find hotel index
    const hotelIndex = dummyHotels.findIndex(hotel => hotel.id === hotelId);
    
    if (hotelIndex === -1) {
      throw new Error('Hotel not found');
    }
    
    // Check for related data (room types)
    const hasRoomTypes = dummyRoomTypes.some(roomType => 
      roomType.hotelIds.includes(hotelId)
    );
    
    if (hasRoomTypes) {
      throw new Error('Cannot delete hotel with related data');
    }
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyHotels.splice(hotelIndex, 1);
    
    return { success: true };
  },
};

/**
 * Room Type API
 */
export const roomTypeAPI = {
  /**
   * Get all room types
   * @param {Object} filters - Optional filters (isActive, hotelId, search)
   * @returns {Promise} - Promise with room types data
   */
  getAllRoomTypes: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredRoomTypes = [...dummyRoomTypes];
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredRoomTypes = filteredRoomTypes.filter(roomType => 
        roomType.isActive === filters.isActive
      );
    }
    
    // Apply hotel filter if provided
    if (filters.hotelId) {
      filteredRoomTypes = filteredRoomTypes.filter(roomType => 
        roomType.hotelIds.includes(filters.hotelId)
      );
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredRoomTypes = filteredRoomTypes.filter(roomType => 
        roomType.type.toLowerCase().includes(searchLower) ||
        roomType.code.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredRoomTypes;
  },
  
  /**
   * Get room type by ID
   * @param {number} roomTypeId - Room Type ID
   * @returns {Promise} - Promise with room type data
   */
  getRoomTypeById: async (roomTypeId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find room type with matching ID
    const roomType = dummyRoomTypes.find(roomType => roomType.id === roomTypeId);
    
    if (roomType) {
      return roomType;
    } else {
      throw new Error('Room type not found');
    }
  },
  
  /**
   * Create a new room type
   * @param {Object} roomTypeData - Room Type data
   * @returns {Promise} - Promise with created room type data
   */
  createRoomType: async (roomTypeData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check if code already exists
    const codeExists = dummyRoomTypes.some(roomType => 
      roomType.code.toLowerCase() === roomTypeData.code.toLowerCase()
    );
    
    if (codeExists) {
      throw new Error('Room type code already exists');
    }
    
    // Validate hotel IDs
    if (roomTypeData.hotelIds && roomTypeData.hotelIds.length > 0) {
      const validHotelIds = roomTypeData.hotelIds.every(hotelId => 
        dummyHotels.some(hotel => hotel.id === hotelId)
      );
      
      if (!validHotelIds) {
        throw new Error('One or more hotel IDs are invalid');
      }
    }
    
    // Create new room type with ID
    const newRoomType = {
      id: dummyRoomTypes.length + 1,
      ...roomTypeData,
      isActive: roomTypeData.isActive !== undefined ? roomTypeData.isActive : true,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyRoomTypes.push(newRoomType);
    
    return newRoomType;
  },
  
  /**
   * Update room type by ID
   * @param {number} roomTypeId - Room Type ID
   * @param {Object} roomTypeData - Updated room type data
   * @returns {Promise} - Promise with updated room type data
   */
  updateRoomType: async (roomTypeId, roomTypeData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find room type index
    const roomTypeIndex = dummyRoomTypes.findIndex(roomType => roomType.id === roomTypeId);
    
    if (roomTypeIndex === -1) {
      throw new Error('Room type not found');
    }
    
    // Check if code already exists (excluding current room type)
    if (roomTypeData.code) {
      const codeExists = dummyRoomTypes.some(roomType => 
        roomType.id !== roomTypeId && 
        roomType.code.toLowerCase() === roomTypeData.code.toLowerCase()
      );
      
      if (codeExists) {
        throw new Error('Room type code already exists');
      }
    }
    
    // Validate hotel IDs if provided
    if (roomTypeData.hotelIds && roomTypeData.hotelIds.length > 0) {
      const validHotelIds = roomTypeData.hotelIds.every(hotelId => 
        dummyHotels.some(hotel => hotel.id === hotelId)
      );
      
      if (!validHotelIds) {
        throw new Error('One or more hotel IDs are invalid');
      }
    }
    
    // Update room type
    const updatedRoomType = {
      ...dummyRoomTypes[roomTypeIndex],
      ...roomTypeData,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyRoomTypes[roomTypeIndex] = updatedRoomType;
    
    return updatedRoomType;
  },
  
  /**
   * Delete room type by ID
   * @param {number} roomTypeId - Room Type ID
   * @returns {Promise} - Promise with success status
   */
  deleteRoomType: async (roomTypeId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find room type index
    const roomTypeIndex = dummyRoomTypes.findIndex(roomType => roomType.id === roomTypeId);
    
    if (roomTypeIndex === -1) {
      throw new Error('Room type not found');
    }
    
    // Check for related data (in a real app, would check orders/bookings)
    // For now, we'll just assume there's no related data
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyRoomTypes.splice(roomTypeIndex, 1);
    
    return { success: true };
  },
};

/**
 * Ticket API
 */
export const ticketAPI = {
  /**
   * Get all tickets
   * @param {Object} filters - Optional filters (isActive, search)
   * @returns {Promise} - Promise with tickets data
   */
  getAllTickets: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredTickets = [...dummyTickets];
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredTickets = filteredTickets.filter(ticket => ticket.isActive === filters.isActive);
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.name.toLowerCase().includes(searchLower) ||
        ticket.code.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredTickets;
  },
  
  /**
   * Get ticket by ID
   * @param {number} ticketId - Ticket ID
   * @returns {Promise} - Promise with ticket data
   */
  getTicketById: async (ticketId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find ticket with matching ID
    const ticket = dummyTickets.find(ticket => ticket.id === ticketId);
    
    if (ticket) {
      return ticket;
    } else {
      throw new Error('Ticket not found');
    }
  },
  
  /**
   * Create a new ticket
   * @param {Object} ticketData - Ticket data
   * @returns {Promise} - Promise with created ticket data
   */
  createTicket: async (ticketData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check if code already exists
    const codeExists = dummyTickets.some(ticket => 
      ticket.code.toLowerCase() === ticketData.code.toLowerCase()
    );
    
    if (codeExists) {
      throw new Error('Ticket code already exists');
    }
    
    // Create new ticket with ID
    const newTicket = {
      id: dummyTickets.length + 1,
      ...ticketData,
      isActive: ticketData.isActive !== undefined ? ticketData.isActive : true,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyTickets.push(newTicket);
    
    return newTicket;
  },
  
  /**
   * Update ticket by ID
   * @param {number} ticketId - Ticket ID
   * @param {Object} ticketData - Updated ticket data
   * @returns {Promise} - Promise with updated ticket data
   */
  updateTicket: async (ticketId, ticketData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find ticket index
    const ticketIndex = dummyTickets.findIndex(ticket => ticket.id === ticketId);
    
    if (ticketIndex === -1) {
      throw new Error('Ticket not found');
    }
    
    // Check if code already exists (excluding current ticket)
    if (ticketData.code) {
      const codeExists = dummyTickets.some(ticket => 
        ticket.id !== ticketId && 
        ticket.code.toLowerCase() === ticketData.code.toLowerCase()
      );
      
      if (codeExists) {
        throw new Error('Ticket code already exists');
      }
    }
    
    // Update ticket
    const updatedTicket = {
      ...dummyTickets[ticketIndex],
      ...ticketData,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyTickets[ticketIndex] = updatedTicket;
    
    return updatedTicket;
  },
  
  /**
   * Delete ticket by ID
   * @param {number} ticketId - Ticket ID
   * @returns {Promise} - Promise with success status
   */
  deleteTicket: async (ticketId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find ticket index
    const ticketIndex = dummyTickets.findIndex(ticket => ticket.id === ticketId);
    
    if (ticketIndex === -1) {
      throw new Error('Ticket not found');
    }
    
    // Check for related data (in a real app, would check orders/bookings)
    // For now, we'll just assume there's no related data
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyTickets.splice(ticketIndex, 1);
    
    return { success: true };
  },
};

/**
 * Vehicle Type API
 */
export const vehicleTypeAPI = {
  /**
   * Get all vehicle types
   * @param {Object} filters - Optional filters (isActive, search)
   * @returns {Promise} - Promise with vehicle types data
   */
  getAllVehicleTypes: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredVehicleTypes = [...dummyVehicleTypes];
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredVehicleTypes = filteredVehicleTypes.filter(vehicleType => 
        vehicleType.isActive === filters.isActive
      );
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredVehicleTypes = filteredVehicleTypes.filter(vehicleType => 
        vehicleType.type.toLowerCase().includes(searchLower) ||
        vehicleType.code.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredVehicleTypes;
  },
  
  /**
   * Get vehicle type by ID
   * @param {number} vehicleTypeId - Vehicle Type ID
   * @returns {Promise} - Promise with vehicle type data
   */
  getVehicleTypeById: async (vehicleTypeId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find vehicle type with matching ID
    const vehicleType = dummyVehicleTypes.find(vehicleType => vehicleType.id === vehicleTypeId);
    
    if (vehicleType) {
      return vehicleType;
    } else {
      throw new Error('Vehicle type not found');
    }
  },
  
  /**
   * Create a new vehicle type
   * @param {Object} vehicleTypeData - Vehicle Type data
   * @returns {Promise} - Promise with created vehicle type data
   */
  createVehicleType: async (vehicleTypeData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check if code already exists
    const codeExists = dummyVehicleTypes.some(vehicleType => 
      vehicleType.code.toLowerCase() === vehicleTypeData.code.toLowerCase()
    );
    
    if (codeExists) {
      throw new Error('Vehicle type code already exists');
    }
    
    // Create new vehicle type with ID
    const newVehicleType = {
      id: dummyVehicleTypes.length + 1,
      ...vehicleTypeData,
      isActive: vehicleTypeData.isActive !== undefined ? vehicleTypeData.isActive : true,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyVehicleTypes.push(newVehicleType);
    
    return newVehicleType;
  },
  
  /**
   * Update vehicle type by ID
   * @param {number} vehicleTypeId - Vehicle Type ID
   * @param {Object} vehicleTypeData - Updated vehicle type data
   * @returns {Promise} - Promise with updated vehicle type data
   */
  updateVehicleType: async (vehicleTypeId, vehicleTypeData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find vehicle type index
    const vehicleTypeIndex = dummyVehicleTypes.findIndex(vehicleType => vehicleType.id === vehicleTypeId);
    
    if (vehicleTypeIndex === -1) {
      throw new Error('Vehicle type not found');
    }
    
    // Check if code already exists (excluding current vehicle type)
    if (vehicleTypeData.code) {
      const codeExists = dummyVehicleTypes.some(vehicleType => 
        vehicleType.id !== vehicleTypeId && 
        vehicleType.code.toLowerCase() === vehicleTypeData.code.toLowerCase()
      );
      
      if (codeExists) {
        throw new Error('Vehicle type code already exists');
      }
    }
    
    // Update vehicle type
    const updatedVehicleType = {
      ...dummyVehicleTypes[vehicleTypeIndex],
      ...vehicleTypeData,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyVehicleTypes[vehicleTypeIndex] = updatedVehicleType;
    
    return updatedVehicleType;
  },
  
  /**
   * Delete vehicle type by ID
   * @param {number} vehicleTypeId - Vehicle Type ID
   * @returns {Promise} - Promise with success status
   */
  deleteVehicleType: async (vehicleTypeId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find vehicle type index
    const vehicleTypeIndex = dummyVehicleTypes.findIndex(vehicleType => vehicleType.id === vehicleTypeId);
    
    if (vehicleTypeIndex === -1) {
      throw new Error('Vehicle type not found');
    }
    
    // Check for related data (vehicles)
    const hasVehicles = dummyVehicles.some(vehicle => vehicle.vehicleTypeId === vehicleTypeId);
    
    if (hasVehicles) {
      throw new Error('Cannot delete vehicle type with related data');
    }
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyVehicleTypes.splice(vehicleTypeIndex, 1);
    
    return { success: true };
  },
};

/**
 * Vehicle API
 */
export const vehicleAPI = {
  /**
   * Get all vehicles
   * @param {Object} filters - Optional filters (branchId, vehicleTypeId, isActive, search)
   * @returns {Promise} - Promise with vehicles data
   */
  getAllVehicles: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredVehicles = [...dummyVehicles];
    
    // Apply branch filter if provided
    if (filters.branchId) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.branchId === filters.branchId
      );
    }
    
    // Apply vehicle type filter if provided
    if (filters.vehicleTypeId) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.vehicleTypeId === filters.vehicleTypeId
      );
    }
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.isActive === filters.isActive
      );
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.plateNumber.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredVehicles;
  },
  
  /**
   * Get vehicle by ID
   * @param {number} vehicleId - Vehicle ID
   * @returns {Promise} - Promise with vehicle data
   */
  getVehicleById: async (vehicleId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find vehicle with matching ID
    const vehicle = dummyVehicles.find(vehicle => vehicle.id === vehicleId);
    
    if (vehicle) {
      return vehicle;
    } else {
      throw new Error('Vehicle not found');
    }
  },
  
  /**
   * Create a new vehicle
   * @param {Object} vehicleData - Vehicle data
   * @returns {Promise} - Promise with created vehicle data
   */
  createVehicle: async (vehicleData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Validate branch ID
    const branchExists = dummyBranches.some(branch => branch.id === vehicleData.branchId);
    if (!branchExists) {
      throw new Error('Branch not found');
    }
    
    // Validate vehicle type ID
    const vehicleTypeExists = dummyVehicleTypes.some(vehicleType => 
      vehicleType.id === vehicleData.vehicleTypeId
    );
    if (!vehicleTypeExists) {
      throw new Error('Vehicle type not found');
    }
    
    // Create new vehicle with ID
    const newVehicle = {
      id: dummyVehicles.length + 1,
      ...vehicleData,
      isActive: vehicleData.isActive !== undefined ? vehicleData.isActive : true,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyVehicles.push(newVehicle);
    
    return newVehicle;
  },
  
  /**
   * Update vehicle by ID
   * @param {number} vehicleId - Vehicle ID
   * @param {Object} vehicleData - Updated vehicle data
   * @returns {Promise} - Promise with updated vehicle data
   */
  updateVehicle: async (vehicleId, vehicleData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find vehicle index
    const vehicleIndex = dummyVehicles.findIndex(vehicle => vehicle.id === vehicleId);
    
    if (vehicleIndex === -1) {
      throw new Error('Vehicle not found');
    }
    
    // Validate branch ID if provided
    if (vehicleData.branchId) {
      const branchExists = dummyBranches.some(branch => branch.id === vehicleData.branchId);
      if (!branchExists) {
        throw new Error('Branch not found');
      }
    }
    
    // Validate vehicle type ID if provided
    if (vehicleData.vehicleTypeId) {
      const vehicleTypeExists = dummyVehicleTypes.some(vehicleType => 
        vehicleType.id === vehicleData.vehicleTypeId
      );
      if (!vehicleTypeExists) {
        throw new Error('Vehicle type not found');
      }
    }
    
    // Update vehicle
    const updatedVehicle = {
      ...dummyVehicles[vehicleIndex],
      ...vehicleData,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyVehicles[vehicleIndex] = updatedVehicle;
    
    return updatedVehicle;
  },
  
  /**
   * Delete vehicle by ID
   * @param {number} vehicleId - Vehicle ID
   * @returns {Promise} - Promise with success status
   */
  deleteVehicle: async (vehicleId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find vehicle index
    const vehicleIndex = dummyVehicles.findIndex(vehicle => vehicle.id === vehicleId);
    
    if (vehicleIndex === -1) {
      throw new Error('Vehicle not found');
    }
    
    // Check for related data (in a real app, would check driver schedules)
    // For now, we'll just assume there's no related data
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyVehicles.splice(vehicleIndex, 1);
    
    return { success: true };
  },
};

/**
 * Plafond API
 */
export const plafondAPI = {
  /**
   * Get all plafonds
   * @param {Object} filters - Optional filters (roleId, type, isActive)
   * @returns {Promise} - Promise with plafonds data
   */
  getAllPlafonds: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredPlafonds = [...dummyPlafonds];
    
    // Apply role filter if provided
    if (filters.roleId) {
      filteredPlafonds = filteredPlafonds.filter(plafond => 
        plafond.roleId === filters.roleId
      );
    }
    
    // Apply type filter if provided
    if (filters.type) {
      filteredPlafonds = filteredPlafonds.filter(plafond => 
        plafond.type === filters.type
      );
    }
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredPlafonds = filteredPlafonds.filter(plafond => 
        plafond.isActive === filters.isActive
      );
    }
    
    return filteredPlafonds;
  },
  
  /**
   * Get plafond by ID
   * @param {number} plafondId - Plafond ID
   * @returns {Promise} - Promise with plafond data
   */
  getPlafondById: async (plafondId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find plafond with matching ID
    const plafond = dummyPlafonds.find(plafond => plafond.id === plafondId);
    
    if (plafond) {
      return plafond;
    } else {
      throw new Error('Plafond not found');
    }
  },
  
  /**
   * Get plafond history by ID
   * @param {number} plafondId - Plafond ID
   * @returns {Promise} - Promise with plafond history data
   */
  getPlafondHistory: async (plafondId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Find plafond with matching ID
    const plafond = dummyPlafonds.find(plafond => plafond.id === plafondId);
    
    if (plafond) {
      return plafond.history || [];
    } else {
      throw new Error('Plafond not found');
    }
  },
  
  /**
   * Create a new plafond
   * @param {Object} plafondData - Plafond data
   * @returns {Promise} - Promise with created plafond data
   */
  createPlafond: async (plafondData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Validate role ID
    const roleExists = dummyRoles.some(role => role.id === plafondData.roleId);
    if (!roleExists) {
      throw new Error('Role not found');
    }
    
    // Validate type
    const validTypes = ['hotel', 'ticket'];
    if (!validTypes.includes(plafondData.type)) {
      throw new Error('Invalid plafond type');
    }
    
    // Create new plafond with ID and history
    const newPlafond = {
      id: dummyPlafonds.length + 1,
      ...plafondData,
      isActive: plafondData.isActive !== undefined ? plafondData.isActive : true,
      history: [
        { date: plafondData.effectiveDate, amount: plafondData.amount }
      ],
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyPlafonds.push(newPlafond);
    
    return newPlafond;
  },
  
  /**
   * Update plafond by ID
   * @param {number} plafondId - Plafond ID
   * @param {Object} plafondData - Updated plafond data
   * @returns {Promise} - Promise with updated plafond data
   */
  updatePlafond: async (plafondId, plafondData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find plafond index
    const plafondIndex = dummyPlafonds.findIndex(plafond => plafond.id === plafondId);
    
    if (plafondIndex === -1) {
      throw new Error('Plafond not found');
    }
    
    // Validate role ID if provided
    if (plafondData.roleId) {
      const roleExists = dummyRoles.some(role => role.id === plafondData.roleId);
      if (!roleExists) {
        throw new Error('Role not found');
      }
    }
    
    // Validate type if provided
    if (plafondData.type) {
      const validTypes = ['hotel', 'ticket'];
      if (!validTypes.includes(plafondData.type)) {
        throw new Error('Invalid plafond type');
      }
    }
    
    // Update history if amount or effective date changed
    let updatedHistory = [...dummyPlafonds[plafondIndex].history];
    if (plafondData.amount && plafondData.effectiveDate) {
      updatedHistory.push({
        date: plafondData.effectiveDate,
        amount: plafondData.amount,
      });
      
      // Sort history by date (newest first)
      updatedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Update plafond
    const updatedPlafond = {
      ...dummyPlafonds[plafondIndex],
      ...plafondData,
      history: updatedHistory,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyPlafonds[plafondIndex] = updatedPlafond;
    
    return updatedPlafond;
  },
  
  /**
   * Delete plafond by ID
   * @param {number} plafondId - Plafond ID
   * @returns {Promise} - Promise with success status
   */
  deletePlafond: async (plafondId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find plafond index
    const plafondIndex = dummyPlafonds.findIndex(plafond => plafond.id === plafondId);
    
    if (plafondIndex === -1) {
      throw new Error('Plafond not found');
    }
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyPlafonds.splice(plafondIndex, 1);
    
    return { success: true };
  },
};

/**
 * Mess Room API
 */
export const messRoomAPI = {
  /**
   * Get all mess rooms
   * @param {Object} filters - Optional filters (branchId, gender, isActive)
   * @returns {Promise} - Promise with mess rooms data
   */
  getAllMessRooms: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredMessRooms = [...dummyMessRooms];
    
    // Apply branch filter if provided
    if (filters.branchId) {
      filteredMessRooms = filteredMessRooms.filter(room => 
        room.branchId === filters.branchId
      );
    }
    
    // Apply gender filter if provided
    if (filters.gender) {
      filteredMessRooms = filteredMessRooms.filter(room => 
        room.gender === filters.gender
      );
    }
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredMessRooms = filteredMessRooms.filter(room => 
        room.isActive === filters.isActive
      );
    }
    
    return filteredMessRooms;
  },
  
  /**
   * Get mess room by ID
   * @param {number} messRoomId - Mess Room ID
   * @returns {Promise} - Promise with mess room data
   */
  getMessRoomById: async (messRoomId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find mess room with matching ID
    const messRoom = dummyMessRooms.find(room => room.id === messRoomId);
    
    if (messRoom) {
      return messRoom;
    } else {
      throw new Error('Mess room not found');
    }
  },
  
  /**
   * Create a new mess room
   * @param {Object} messRoomData - Mess Room data
   * @returns {Promise} - Promise with created mess room data
   */
  createMessRoom: async (messRoomData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Validate branch ID
    const branchExists = dummyBranches.some(branch => branch.id === messRoomData.branchId);
    if (!branchExists) {
      throw new Error('Branch not found');
    }
    
    // Validate gender
    const validGenders = ['male', 'female'];
    if (!validGenders.includes(messRoomData.gender)) {
      throw new Error('Invalid gender');
    }
    
    // Create new mess room with ID
    const newMessRoom = {
      id: dummyMessRooms.length + 1,
      ...messRoomData,
      isActive: messRoomData.isActive !== undefined ? messRoomData.isActive : true,
    };
    
    // Add to dummy data (in real API this would be a POST request)
    dummyMessRooms.push(newMessRoom);
    
    return newMessRoom;
  },
  
  /**
   * Update mess room by ID
   * @param {number} messRoomId - Mess Room ID
   * @param {Object} messRoomData - Updated mess room data
   * @returns {Promise} - Promise with updated mess room data
   */
  updateMessRoom: async (messRoomId, messRoomData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find mess room index
    const messRoomIndex = dummyMessRooms.findIndex(room => room.id === messRoomId);
    
    if (messRoomIndex === -1) {
      throw new Error('Mess room not found');
    }
    
    // Validate branch ID if provided
    if (messRoomData.branchId) {
      const branchExists = dummyBranches.some(branch => branch.id === messRoomData.branchId);
      if (!branchExists) {
        throw new Error('Branch not found');
      }
    }
    
    // Validate gender if provided
    if (messRoomData.gender) {
      const validGenders = ['male', 'female'];
      if (!validGenders.includes(messRoomData.gender)) {
        throw new Error('Invalid gender');
      }
    }
    
    // Update mess room
    const updatedMessRoom = {
      ...dummyMessRooms[messRoomIndex],
      ...messRoomData,
    };
    
    // Update in dummy data (in real API this would be a PUT request)
    dummyMessRooms[messRoomIndex] = updatedMessRoom;
    
    return updatedMessRoom;
  },
  
  /**
   * Delete mess room by ID
   * @param {number} messRoomId - Mess Room ID
   * @returns {Promise} - Promise with success status
   */
  deleteMessRoom: async (messRoomId) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find mess room index
    const messRoomIndex = dummyMessRooms.findIndex(room => room.id === messRoomId);
    
    if (messRoomIndex === -1) {
      throw new Error('Mess room not found');
    }
    
    // Check for related data (in a real app, would check mess room requests)
    // For now, we'll just assume there's no related data
    
    // Remove from dummy data (in real API this would be a DELETE request)
    dummyMessRooms.splice(messRoomIndex, 1);
    
    return { success: true };
  },
};

/**
 * City API
 */
export const cityAPI = {
  /**
   * Get all cities
   * @param {Object} filters - Optional filters (isActive, search)
   * @returns {Promise} - Promise with cities data
   */
  getAllCities: async (filters = {}) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCities = [...dummyCities];
    
    // Apply active filter if provided
    if (filters.isActive !== undefined) {
      filteredCities = filteredCities.filter(city => city.isActive === filters.isActive);
    }
    
    // Apply search filter if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCities = filteredCities.filter(city => 
        city.name.toLowerCase().includes(searchLower) ||
        city.code.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredCities;
  }
    }

// Export default API client for direct use
export default apiClient;