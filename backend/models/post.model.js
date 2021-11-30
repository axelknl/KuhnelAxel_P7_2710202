const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class PostModel {
    tableName = 'post';

    find = async () => {
        let sql = 'SELECT user.username, user.profile_picture, user.job, post.user_id, post.id, post.likeNbr, post.picture, post.description, post.date FROM user AS user INNER JOIN post AS post ON (user.id = post.user_id) ORDER BY post.id DESC;'

        return await query(sql);
    }

    findOne = async (id) => {
        let sql = 'SELECT post.user_id FROM post WHERE id = ?';

        return await query(sql, [id]);
    }

    //comment
    findOneComment = async (id) => {
        let sql = 'SELECT comment.comment_user FROM comment WHERE comment_id = ?';

        return await query(sql, [id]);
    }

    // comment
    updateComment = async (message, id) => {
        const sql = 'UPDATE comment SET comment_message = ? WHERE comment_id = ?'

        return await query(sql, [message, id]);
    }

    //comment
    deleteAllComment = async (id) => {

        const sql = 'DELETE FROM comment WHERE comment_post = ?'

        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    // comment
    deleteComment = async (id) => {

        const sql = 'DELETE FROM comment WHERE comment_id = ?'

        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    // comment
    createComment = async({message, date, user, post}) => {
        const sql = 'INSERT INTO comment (comment_message, comment_date, comment_user, comment_post) VALUES (?,?,?,?)';

        const result = await query(sql, [message, date, user, post]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    // comment
    getComment = async (id) => {
        console.log(id)
        let sql = 'SELECT comment.comment_id, comment.comment_message, comment.comment_date, comment.comment_user, user.username, user.profile_picture FROM comment INNER JOIN user AS user ON comment.comment_user = user.id AND comment.comment_post = ?';

        return await query(sql, [id]);
    }

    // like
    findLike = async (id) => {
        console.log(id)
        let sql = 'SELECT liked.like_post FROM liked WHERE like_user = ?';

        return await query(sql, [id]);
    }

    // like
    updateLike = async (like, id) => {

        const sql = `UPDATE post SET likeNbr = ? WHERE id = ?`;

        const result = await query(sql, [like, id]);

        return result;
    }

    // like
    createLike = async ({user_id, post_id}) => {
        const sql = `INSERT INTO liked (like_user, like_post) VALUES (?,?)`;

        const result = await query(sql, [user_id, post_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    // like
    deleteAllLike = async (id) => {

        const sql = 'DELETE FROM liked WHERE like_post = ?'

        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    // like
    deleteLike = async ({user_id, post_id}) => {
        const sql = `DELETE FROM liked WHERE like_user = ? AND like_post = ?`;
        
        const result = await query(sql, [user_id, post_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    
    update = async (message, id) => {
        const sql = 'UPDATE post SET description = ? WHERE id = ?'

        return await query(sql, [message, id])
    }

    create = async ({ picture, description, like = 0, user_id, date}) => {
        const sql = `INSERT INTO ${this.tableName}
        (picture, description, likeNbr, user_id, date) VALUES (?,?,?,?,?)`;

        const result = await query(sql, [picture, description, like, user_id, date]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    delete = async (id) => {

        const sql = `DELETE FROM ${this.tableName} 
        WHERE id = ?`
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new PostModel;