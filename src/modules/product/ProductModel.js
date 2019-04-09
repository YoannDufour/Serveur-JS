const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

        name: {
            type: String,
            required: true,
            empty: false,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            empty: false
        },

        creationDate: {
            type: Date,
            default: Date.now
        },

        lastUpdate: {
            type: Date,
            default: Date.now
        },
        desc: {
            type: String,
            required: true,
            empty: false,
            trim: true
        },
        associe: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Category'
        },
        img: {
            type: String,
            required: false,
            empty: false,
            trim: true
        }
    },
    /*  {
          toObject: {virtuals: true},
          toJSON: {virtuals: true}
          // Permet l'utilisation d'objet virtuel -> Object qui découle des objets existant
      }*/
);

ProductSchema.pre('save', function (next) {
    this.lastUpdate = new Date();
    next();
})
ProductSchema.pre('update', function (next) {
    this.lastUpdate = new Date();
    next();
})

mongoose.model('Product', ProductSchema);

