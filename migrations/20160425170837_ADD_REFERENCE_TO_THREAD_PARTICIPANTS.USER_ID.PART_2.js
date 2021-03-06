exports.up = function(knex, Promise) {
  return knex.schema.table('thread_participants', (table)=>{
   	table.integer('thread_id').notNullable().index();
  	table.integer('user_id').notNullable().index().references('users.id').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('thread_participants', (table)=>{
  	table.dropColumn('thread_id');
  	table.dropColumn('user_id');
  })
};
