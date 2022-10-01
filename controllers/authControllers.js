const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { jwtSecret } = require('../config');
const { createError } = require('../helpers');
const { notValidCredentials } = require('../constants');
