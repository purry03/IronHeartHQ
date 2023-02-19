/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('transactions',{
		id: 'id',
		user_id: { type: 'int', notNull: true},
		operation: {type: 'varchar', notNull: true},
		amount: {type: 'bigint', notNull: true, default: 0},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
};

exports.down = pgm => {};
