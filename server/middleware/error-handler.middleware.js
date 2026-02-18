/**
 * Centralized error handler middleware
 * Converts Prisma errors and other errors into user-friendly messages
 */

export const errorHandler = (err, req, res, next) => {

  // Prisma Unique Constraint Violation (e.g., duplicate email, studentId)
  if (err.code === 'P2002') {
    // Try to extract field name from different possible locations
    let field = 'field';
    
    // Try meta.target first (standard Prisma)
    if (err.meta?.target) {
      field = Array.isArray(err.meta.target) ? err.meta.target[0] : err.meta.target;
    }
    // Try driverAdapterError.cause.constraint.fields (Prisma with adapters)
    else if (err.meta?.driverAdapterError?.cause?.constraint?.fields) {
      const fields = err.meta.driverAdapterError.cause.constraint.fields;
      field = fields[0]?.replace(/"/g, ''); // Remove quotes like "studentId"
    }
    
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }

  // Prisma Foreign Key Constraint (e.g., invalid classId reference)
  if (err.code === 'P2003') {
    const field = err.meta?.field_name || 'reference';
    return res.status(400).json({
      success: false,
      message: `Invalid ${field} - referenced record does not exist`
    });
  }

  // Prisma Record Not Found
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Record not found'
    });
  }

  // Prisma Required Field Missing
  if (err.code === 'P2011') {
    const field = err.meta?.constraint?.[0] || 'field';
    return res.status(400).json({
      success: false,
      message: `${field} is required`
    });
  }

  // Validation errors (from express-validator or similar)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // JWT/Auth errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default: Internal Server Error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};