import { Router } from 'express';
import { gettingJudgesController, creationsJudgesController } from '../../controllers/index.js';

const judgesRouter = Router()

function createJudgesRouter(judgesServices, eventsServices, emailService, middlewares, judgesValidations, adminValidations, eventsValidations) {
    const { apiLimiter, registrationLimiter, verifyAdminLogin, validator } = middlewares
    const { insertJudgeValidation, getJudgeValidation, loginJudgeValidation } = judgesValidations
    const { verifyAdminValidation } = adminValidations
    const { eventNameParamValidation } = eventsValidations
    const { getJudgeFromToken,getJudgeFromJid  ,loginJudge, getProjects, getJudges , getAllocatedProjects } = gettingJudgesController(judgesServices, eventsServices)
    const { insertJudge } = creationsJudgesController(judgesServices, emailService)
    judgesRouter.use(apiLimiter)
    judgesRouter.get('/:event_name/allocations', eventNameParamValidation(), validator, getProjects)
    judgesRouter.get('/registration/view/:event_name', eventNameParamValidation(), validator, getJudges)
    judgesRouter.get('/verify', getJudgeValidation(), verifyAdminValidation(5), validator, verifyAdminLogin, getJudgeFromToken)
    judgesRouter.get('/allocations/:jid' , getAllocatedProjects)
    judgesRouter.get('/:jid' , getJudgeFromJid )
    judgesRouter.use(registrationLimiter)
    judgesRouter.post('/register/:event_name', eventNameParamValidation(), insertJudgeValidation(), validator, insertJudge)
    judgesRouter.post('/login', loginJudgeValidation(), validator, loginJudge)



    return judgesRouter
}

export default createJudgesRouter;