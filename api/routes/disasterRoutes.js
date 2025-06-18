const express = require('express');
const router = express.Router();
const { testDisaster, createDisaster, getDisasters, getNearbyDisasters, deleteDisaster, updateDisaster,getDisasterById } = require('../controllers/disasterController');


router.post('/', createDisaster);
router.get('/all', getDisasters);
router.get('/nearby', getNearbyDisasters);
router.delete('/:id', deleteDisaster);
router.put('/:id', updateDisaster);
router.get('/disaster/:id', getDisasterById);

module.exports = router;
