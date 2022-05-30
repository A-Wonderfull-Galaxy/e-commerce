const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attribute: [
      'id', 
      'tag_name'
    ],
  
  // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
  // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData=>{
    if (!dbTagData){
      res.status(404).json({
        message: 'No tag found with this id!'
      });
      return;
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {id: req.params.id}
  })
  .then(dbTagData => {
    if (!dbTagData){
      res.status(404).json({ message: 'No ID found'})
      return;
    }
    res.json(dbTagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'not id found'})
      return
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

module.exports = router;
