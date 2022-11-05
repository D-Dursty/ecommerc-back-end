const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [
        Product, {
          model:Product,
          through:ProductTag
        }
      ]
    }); 
    if (!tags) {
      return res.status(400).json({msg:"No associated tag found"})
    }
    res.status(200).json(tags)
    } catch (err) {
      res.statusMessage(404),json({msg:"No associating tag found"})
    }
});

router.get('/:id', async(req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
    // be sure to include its associated Product data  
    include: [Product, {
        model:Product,
        through:ProductTag
      }]
    });
    if (!tag){
      return res.status(400).json({msg:"No matching tag found"})
    }
    res.status(200).json(tag)
  }catch (err){
    console.log(err)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const tag = await Tag.create(req.body);
    return res.status(200).json(tag);
  }catch (err){
    return res.status(500).json({msg:"Server unable to create new tag, please try again"})
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const tag = await Tag.update(req.body, {
      where:{
        id:req.params.id
      }
    }); 
    return res.status(200).json(tag)
  } catch(err){
    return res.status(500).json({msg:"Error, unable to update"})
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const tag = await Tag.destroy({
      where:{
        id:req.params.id
      }
    });
  } catch(err){
    return res.status(500).json({msg:"Server unable to delete, please try again!"})
  }
});

module.exports = router;
