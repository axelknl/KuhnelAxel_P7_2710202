const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class UserModel {
    tableName = 'user';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    verifyOwner = async (id) => {
        const sql = 'SELECT * FROM user WHERE id = ?'

        return await query(sql, [id])
    }

    create = async ({ username, password, first_name, last_name, job, email, role = Role.SuperUser, age = 0 }) => {
        const sql = `INSERT INTO ${this.tableName}
        (username, password, first_name, last_name, job, email, role, age) VALUES (?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [username, password, first_name, last_name, job, email, role, age]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    updatePassword = async (req, id) => {
        console.log(req)
        const sql = 'UPDATE user SET password = ? WHERE id = ?'

        return await query(sql, [req.body.password, id])
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    deleteAll = async (id) => {
        const sql1 = 'DELETE FROM comment WHERE comment_user = ?'
        const sql2 = 'DELETE FROM liked WHERE like_user = ?'
        const sql3 = 'DELETE FROM post WHERE user_id = ?'

        const result1 = await query(sql1, [id])
        const result2 = await query(sql2, [id])
        const result3 = await query(sql3, [id])

        const affectedRows1 = result1 ? result1.affectedRows : 0;
        const affectedRows2 = result2 ? result2.affectedRows : 0;
        const affectedRows3 = result3 ? result3.affectedRows : 0;

        return {affectedRows1, affectedRows2, affectedRows3}
    }
}

module.exports = new UserModel;