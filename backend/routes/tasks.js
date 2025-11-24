const express = require('express');
const { error } = taskSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });
const { title, description, status } = req.body;
const task = new Task({ title, description, status, createdBy: req.user._id });
await task.save();
res.json(task);
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});


// Get tasks - admin sees all, user sees own
router.get('/', auth, async (req,res) => {
try {
const filter = req.user.role === 'admin' ? {} : { createdBy: req.user._id };
// pagination & search (bonus)
const { page = 1, limit = 20, q } = req.query;
if (q) filter.$or = [{ title: new RegExp(q,'i') }, { description: new RegExp(q,'i') }];
const tasks = await Task.find(filter).populate('createdBy','name email role').sort({ createdAt: -1 }).skip((page-1)*limit).limit(parseInt(limit));
const total = await Task.countDocuments(filter);
res.json({ tasks, total });
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});


// Get task by id - owner or admin
router.get('/:id', auth, async (req,res) => {
try {
const task = await Task.findById(req.params.id).populate('createdBy','name email role');
if (!task) return res.status(404).json({ message: 'Task not found' });
if (req.user.role !== 'admin' && task.createdBy._id.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
res.json(task);
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});


// Update task - owner or admin
router.put('/:id', auth, async (req,res) => {
try {
const { error } = taskSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
task.title = req.body.title;
task.description = req.body.description;
task.status = req.body.status;
await task.save();
res.json(task);
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});


// Delete task - owner or admin
router.delete('/:id', auth, async (req,res) => {
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
await task.remove();
res.json({ message: 'Task removed' });
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});


module.exports = router
