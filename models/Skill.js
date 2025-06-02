const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'database', 'devops', 'mobile', 'other']
  },
  proficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0
  },
  icon: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
skillSchema.index({ category: 1, order: 1 });
skillSchema.index({ name: 1 });

module.exports = mongoose.model('Skill', skillSchema); 