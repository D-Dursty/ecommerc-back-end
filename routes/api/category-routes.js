const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = Category.findAll({include:[Product]});
    res.status(200).json(categories)
  }catch (err) {
    res.status(404).json({msg:"Whoops, nothing to see here!"})
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product]
    })
    if (!category){
      return res.status(400).json({msg:"Whoops, no category to be found!"})
    }
    res.status(200).json(category)
  } catch (err) {
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const category = await Category.create(req.body);
  res.status(200).json(category)
  } catch (err) {
  console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, 
      {where:{id:req.params.id}});
      return res.status(200).json(category)
  } catch(err){
    return res.status(500).json({msg:"Our server is having trouble saving right now, please try again. "})
  }
  
});

router.delete('/:id', async (req, res) => {
  try{
    const category = await Category.destroy({
      where:{id:req.params.id}});
      return res.status(200).json({msg:"Successfully deleted!"})
  } catch (err) {
    return res.status(500).json({msg:"Our server was unable to process that request, please try again!"})
  }
});

module.exports = router;
