/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('announcemwnts',{
		id: 'id',
		user_name: { type: 'varchar(50)', notNull: true},
		content: { type: 'varchar(500)', notNull: true},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
};

exports.down = pgm => {};
