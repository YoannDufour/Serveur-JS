const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

        name: {
            type: String,
            required: true,
            empty: false,
            trim: true
        },
        desc: {
            type: String,
            required: true,
            empty: false
        }

    },
    /*  {
          toObject: {virtuals: true},
          toJSON: {virtuals: true}
          // Permet l'utilisation d'objet virtuel -> Object qui découle des objets existant
      }*/
);

CategorySchema.pre('save', function (next) {
    this.lastUpdate = Date.now;
    next();
})
CategorySchema.pre('update', function (next) {
    this.lastUpdate = Date.now;
    next();
})

mongoose.model('Category', CategorySchema);

