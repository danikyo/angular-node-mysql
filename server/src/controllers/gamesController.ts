import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

    public async list (req: Request, res: Response) {
        await pool.query('SELECT * FROM games', function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    public async getOne (req: Request, res: Response): Promise <any> {
        const {id} = req.params;
        await pool.query('SELECT * FROM games WHERE id = ?', [id], function(err, result) {
            if (err) throw err;
            if (result.length > 0) res.json(result[0]); 
            else res.status(404).json({text: "Game doesn't exist"});
        });
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Game saved'});
    }

    public async update (req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: "Game Updated"});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'Game deleted'});
    }

}

export const gamesController = new GamesController();