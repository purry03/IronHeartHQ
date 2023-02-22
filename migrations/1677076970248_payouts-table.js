/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('payouts',{
		id: 'id',
		user_id: { type: 'int', notNull: true},
		amount: {type: 'bigint', notNull: true, default: 0},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
};

exports.down = pgm => {};
