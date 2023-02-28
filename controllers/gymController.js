const { Router } = require('express');
const Trainer = require('../models/Trainer');
const db = require('../sequilize');
const router = Router();

const Gym = db.gym;


module.exports.getAllGem = async (req, res) => {

    try {
        const allGym = await Gym.findAll({

        })

        res.status(200).json(allGym)
    } catch {
        res.status(404).json({ gym: 'wrong' })
    }
}

module.exports.createGym = async (req, res) => {


    try {
        if (req.user.role === 'admin') {
            const { gymName, location, phoneNum } = req.body;
            // console.log(req.body)
            const newGym = await Gym.create({ gymName, location, phoneNum })
            // console.log(newGym)

            res.status(201).json({ newGym });
        } else {
            res.status(403).json({ message: 'not authurized' });

        }


    } catch {

        res.json({ newGym: 'did not create gym' })
    }
}

module.exports.deleteGym = async (req, res) => {
    try {
        if (req.user.role==='admin') {
            const gymId = req.params.id;
            const wantedGym = await Gym.findByPk(gymId)
            await wantedGym.destroy()
            res.json('gym  deleted from DB')
        } else {
            res.status(403).json({ message: 'not authurized' });

        }

     

    } catch {
        res.status(404).json({ wantedGym: 'gym not found' })

    }
}

module.exports.updateGym = async (req, res) => {
    try {

        const gymId = req.params.id;
        const oldGym = await Gym.findByPk(gymId);
        const { gymName, location, phoneNum } = req.body
        // console.log(oldGym.dataValues.location);

        const gym = await oldGym.update({ gymName, location, phoneNum })
        // console.log(gym)
        res.json('gym  updated from DB')

    } catch {
        res.status(404).json({ wantedGym: 'gym not found' })


    }
}