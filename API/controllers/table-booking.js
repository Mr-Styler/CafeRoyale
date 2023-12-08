const queryFunc = require('../utils/docFactoryFunc');
const Table_Booking = require('../models/table-booking');
const catchAsync = require('../utils/catchAsync');

exports.getAllBookings = queryFunc.getAll(Table_Booking);

exports.getBooking = queryFunc.getOne(Table_Booking);

exports.createTableBooking = catchAsync(async (req, res, next) => {      
    const { phone, time, no_of_people, message } = req.body;

    console.log(req.body)

    const [year, month, day] = time.split("T")[0].split('-')
    const [hour, minute] = time.split("T")[1].split(":");

    console.log(year, month, day, hour, minute)

    const edittedTime = new Date(year, month, day, hour, minute);
    const nextDay = new Date(year, month, String(day * 1 + 1));

    let table_no, bookings;

    do {
    table_no = Math.floor(Math.random() * 25) + 1;
    bookings = await Table_Booking.findOne({
            table_no,
            time: { $gte: edittedTime },
            time: { $lt: nextDay },
        });
    } while (bookings);

    console.log("no bookings");
    bookings = await Table_Booking.create({
        phone,
        table_no,
        time,
        no_of_people,
        message,
        booker: req.session.user._id
    });

    bookings.save();

    console.log(table_no);

    return res.status(200).json({
        status: 'success',
        data: {
            document: bookings
        }
    });
  });

exports.updateBooking = queryFunc.updateOne(Table_Booking);

exports.deleteBooking = queryFunc.deleteOne(Table_Booking);