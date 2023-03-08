import { eventsQueries, ticketQueries } from '../../../models/index.js';
import { AppError } from '../../../utils/index.js';
import { eventsName, projectDomains } from '../../../static/eventsData.mjs';

function eventsServices(db) {
    async function getUserRegistration(event_name, email) {
        try {
            const [results] = await db.execute(eventsQueries.checkUserRegistration(event_name), [email]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function getTicketDetails(ticket) {
        try {
            const [[results]] = await db.execute(ticketQueries.checkTicket, [ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function getMembersFromTicket(ticket) {
        try {
            const [results] = await db.execute(ticketQueries.getMembers, [ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function getPaymentDetails(pid, event_name) {
        try {
            const [results] = await db.execute({ sql: ticketQueries.getPayment, namedPlaceholders: true }, { pid, event_name: event_name[0].toUpperCase() }).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function insertTicket(data) {
        try {
            const [results] = await db.execute({ sql: ticketQueries.insertTicket, namedPlaceholders: true }, data).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function editStepData(ticket, step_no, data) {
        try {
            const [results] = await db.execute(ticketQueries.editStepData(step_no), [data, step_no, ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function editPaymentAndStep(data, updated_step) {
        try {
            const [results] = await db.execute(ticketQueries.editPaymentAndStep, [updated_step, data.payment_id, data.ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function completeRegistration(event_name, data) {
        try {
            const { step_1: { title, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, demo, reason_of_demo }, step_2, step_3: { college, year, country, state, district, city, locality, mode, reason_of_mode, referral }, ticket, payment_id } = data
            let dataArray = []
            const domain_full = projectDomains[domain]
            switch (event_name) {
                case eventsName[0]:
                    switch (step_2.length) {
                        case 2:
                            dataArray = [title, domain_full, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, mode, reason_of_mode, step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, college, country, state, district, city, locality, referral, ticket, payment_id]
                            break

                        case 3:
                            dataArray = [title, domain_full, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, mode, reason_of_mode, step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, step_2[2].name, step_2[2].email, step_2[2].phone, step[2].gender, college, country, state, district, city, locality, referral, ticket, payment_id]
                            break

                        case 4:
                            dataArray = [title, domain_full, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, mode, reason_of_mode, step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, step_2[2].name, step_2[2].email, step_2[2].phone, step[2].gender, step_2[3].name, step_2[3].email, step_2[3].phone, step[3].gender, college, country, state, district, city, locality, referral, ticket, payment_id]
                            break

                        case 5:
                            dataArray = [title, domain_full, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, mode, reason_of_mode, step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, step_2[2].name, step_2[2].email, step_2[2].phone, step[2].gender, step_2[3].name, step_2[3].email, step_2[3].phone, step[3].gender, step_2[4].name, step_2[4].email, step_2[4].phone, step[4].gender, college, country, state, district, city, locality, referral, ticket, payment_id]
                            break
                    }
                    break

                case eventsName[1]:
                    switch (step_2.length) {
                        case 2:
                            dataArray = [title, domain_full, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, demo, reason_of_demo, step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, college, year, country, state, district, city, locality, mode, reason_of_mode, referral, ticket, payment_id]
                            break

                        case 3:
                            dataArray = [title, domain_full, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, demo, reason_of_demo, step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, step_2[2].name, step_2[2].email, step_2[2].phone, step[2].gender, college, year, country, state, district, city, locality, mode, reason_of_mode, referral, ticket, payment_id]
                            break

                        case 4:
                            dataArray = [title, domain_full, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, demo, reason_of_demo, step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, step_2[2].name, step_2[2].email, step_2[2].phone, step[2].gender, step_2[3].name, step_2[3].email, step_2[3].phone, step[3].gender, college, year, country, state, district, city, locality, mode, reason_of_mode, referral, ticket, payment_id]
                            break

                        case 5:
                            dataArray = [title, domain_full, domain, project_type, guide_name, guide_email, guide_phone, hod_email, sponsored, company, nda, abstract, demo, reason_of_demo, step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, step_2[2].name, step_2[2].email, step_2[2].phone, step[2].gender, step_2[3].name, step_2[3].email, step_2[3].phone, step[3].gender, step_2[4].name, step_2[4].email, step_2[4].phone, step[4].gender, college, year, country, state, district, city, locality, mode, reason_of_mode, referral, ticket, payment_id]
                            break
                    }
                    break

                case eventsName[2]:
                    switch (step_2.length) {
                        case 1:
                            dataArray = [step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, college, year, country, state, district, city, locality, mode, reason_of_mode, referral, ticket, payment_id]
                            break

                        case 2:
                            dataArray = [step_2[0].name, step_2[0].email, step_2[0].phone, step[0].gender, step_2[1].name, step_2[1].email, step_2[1].phone, step[1].gender, college, year, country, state, district, city, locality, mode, reason_of_mode, referral, ticket, payment_id]
                            break
                    }
                    break
            }
            const [results] = await db.execute(eventsQueries.completeRegistration(event_name, step_2.length), dataArray).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            console.log(results);
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function getPendingPayments(event_name) {
        try {
            const [results] = await db.execute(ticketQueries.getPendingPayments, [event_name[0].toUpperCase()]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    return {
        getUserRegistration,
        getTicketDetails,
        getMembersFromTicket,
        getPaymentDetails,
        insertTicket,
        editStepData,
        editPaymentAndStep,
        completeRegistration,
        getPendingPayments,
    }
}

export default eventsServices;