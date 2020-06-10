
exports.up = function(knex) {
    return knex.schema.createTable('CarInfo', tbl => {
        tbl.increments();
        tbl.string('VIN', 128).notNullable().unique();
        tbl.string('make', 128).notNullable();
        tbl.string('model', 128).notNullable();
        tbl.integer('mileage', 12).notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('carInfo')
};
