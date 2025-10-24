# 1) creating a local database
use natours-test

db.tours.insertOne({ name: "Ther Forest Hiker", Price: 297, rating: 4.7 })

db.tours.find()

show dbs

use admin

use natours-test

show collection

quit()

# 2) creating documents
db.tours.insertMany([{ name: "The Sea Explore", price: 497, rating: 4.8 }, { name: "The Snow Adventurer", price: 997, rating: 4.9, difficulty: "easy" }])

db.tours.find()