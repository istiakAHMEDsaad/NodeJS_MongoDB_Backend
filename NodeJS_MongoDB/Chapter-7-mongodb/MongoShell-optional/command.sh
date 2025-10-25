# --------- 1. creating a local database ---------

# create and switch database
use natours-test

# insert data
db.tours.insertOne({ name: "Ther Forest Hiker", Price: 297, rating: 4.7 })

# find first data
db.tours.find()

# show all databse we have
show dbs

# use existing datbase or create a new
use admin

# switch to another datbase
use natours-test

# show database collection
show collection

# exit the databse/shell
quit()

# --------- 2. creating documents ---------

# insert multiple documents at the same time
db.tours.insertMany([{ name: "The Sea Explore", price: 497, rating: 4.8 }, { name: "The Snow Adventurer", price: 997, rating: 4.9, difficulty: "easy" }])

db.tours.find()

# --------- 3. querying reading documents ---------

# get the all query by using "find method without using anything"
db.tours.find()

# search item in the document
db.tours.find({ name: "Ther Forest Hiker" })
db.tours.find({ difficulty: "easy" })

# special query operator {$lte} less than equal, {$gte} greater than equal
db.tours.find({ price: {$lte: 500} })

# both true condition query (need 2 value to be true)
db.tours.find({ price: {$lt: 500}, rating: {$gte: 4.8} })

# or query (need only 1 value to be true) {$or}
db.tours.find({ $or: [ {price: {$lt: 500}}, {rating: {$gte: 4.8}} ] })

# pass object as projection {means: we only want the name to be output, others are not gonna appear}
db.tours.find({ $or: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}} ] }, {name: 1})

# --------- 4. querying reading documents ---------
db.tours.updateOne({ name: "The Snow Adventurer"}, {$set: {Price: 597}})
db.tours.find({ price: {$gt: 500}, rating: {$gte: 4.8} })
# db.tours.find({ $and: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}} ] })
db.updateMany({ price: {$gt: 500}, rating: {$gte: 4.8} }, { $set: {premium: true} })
db.tours.find()

# replaceOne or replaceMany
db.tours.replaceOne()