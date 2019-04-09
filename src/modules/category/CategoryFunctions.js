const mongoose = require('mongoose');
const Category = mongoose.model('Category');

class CategoryFunctions {

    static getCategoryById(categoryId) {
        return new Promise(function (resolve, reject) {
            Category.find({"_id": categoryId}).exec(function (err, category) {
                if (err) {
                    return reject({
                        message: "Category Non existante sur la base de donnée",
                        status: 404
                    });
                }
                resolve(category[0]);
            });
        })
    }

}

module.exports = CategoryFunctions;