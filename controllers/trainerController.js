const { Router } = require('express');
const db = require('../sequilize');
const router = Router();
const Trainer = db.trainer;
const Session = db.session;
const Gym = db.gym;
const GymTrainer = db.gymTrainer


module.exports.getAllTrainersInGym = async (req, res) => {
    const gymId = req.query.gymId
    // console.log(req.params.id)
    try {
        const gym = await Gym.findByPk(gymId)
        console.log(gym)
        const trainers = await gym.getTrainers();
        console.log(trainers)
        res.status(200).json(trainers)

    } catch {
        res.status(404).json({ trainers: 'wrong in getting trainers data' })
    }
}

module.exports.createTrainer = async (req, res) => {



    // console.log(req.params.id)
    try {
        if (req.user.role === 'admin') {
            const { trainerName, experiance, bio, phoneNum, gymId } = req.body;
            // console.log(req.body)
            const gym = await Gym.findByPk(gymId)
            // console.log(gym)phoneNum
            let trainer;
            const existingTrainer = await Trainer.findOne({
                where: { phoneNum: phoneNum }
            })

            if (existingTrainer) {
                existingTrainer.addGym(gym)
                res.status(200).json(existingTrainer)

            } else {
                trainer = await Trainer.create({ trainerName, experiance, bio, phoneNum })
                trainer.addGym(gym);
                res.status(200).json(trainer)

            }

            // gym.addTrainer(trainer)
        } else {

            res.status(403).json({ message: 'not authurized' });
        }

    } catch {
        res.status(404).json({ trainer: 'adding trainer wrong' })
    }
}


module.exports.deleteTrainer = async (req, res) => {


    try {
        if (req.user.role === 'admin') {

            // const gymId = req.params.gymid;
            const trainerId = req.params.id;
            console.log(trainerId)

            const trainer = await Trainer.findByPk(trainerId);
            console.log(trainer)
            await trainer.destroy();

            res.json('trainer deleted')
        } else {

            res.status(403).json({ message: 'not authurized' });
        }


    } catch {
        res.json('did not delete trainer')
    }
}

module.exports.updateTrainer = async (req, res) => {
    try {
        const trainerId = req.params.trainerId;
        const oldTrainer = await Trainer.findByPk(trainerId);
        const { trainerName, experiance, bio, specialize } = req.body


        const gym = await oldGym.update({ trainerName, experiance, bio, specialize })

        res.json('trainer  updated from DB')

    } catch {
        res.status(404).json('trainer not found')


    }
}