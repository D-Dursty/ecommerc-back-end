const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll(req.params.id, {
      include:[Product] 
      // be sure to include its associated Products
    })
    if (!categories) {
      return res.status(400).json({message:"Nothing to See Here :("})
    }
    res.status(200).json(categories)
  } catch (err) {
    console.log(err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
