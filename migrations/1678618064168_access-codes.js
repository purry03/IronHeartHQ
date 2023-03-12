/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('accesscodes',{
		id: 'id',
		user_name: { type: 'varchar(50)', notNull: true},
		code: { type: 'varchar(50)', notNull: true},
		consumed: {type: 'boolean', notNull: true, default: false},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
};

exports.down = pgm => {};
