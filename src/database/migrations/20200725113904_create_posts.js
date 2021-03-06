
exports.up = function (knex) {
    return knex.schema.createTable('posts', table => {
        table.uuid('id').primary()
        table.string('name')
        table.integer('size')
        table.string('key')
        table.string('url')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts')
};
