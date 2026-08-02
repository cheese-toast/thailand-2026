const tripData = {
  title: "Thailand Trip 2026",
  travellers: "Michael, Anuta, Sofia and Ciaran",
  stops: [
    {
      type: "flight",
      icon: "✈️",
      title: "Gatwick → Bangkok",
      dateRange: "16–17 Nov 2026",
      summary: "BA2231, 21:20 → 16:05 (+1 day)",
      details: {
        flightNumber: "BA2231",
        departure: "London Gatwick (T5), 16 Nov 2026, 21:20",
        arrival: "Bangkok (BKK), 17 Nov 2026, 16:05",
        bookingRef: "YZ7N2A",
        seats: null, // TODO
        luggage: "23kg checked bag per person",
        avios: 115500,
        cash: "GBP 1045.80",
        membershipNumber: "21651167",
      },
      cost: { total: 1045.8, currency: "GBP", paid: null, outstanding: null },
    },
    {
      type: "flight",
      icon: "✈️",
      title: "Bangkok → Krabi",
      dateRange: "17 Nov 2026",
      summary: "PG263, 19:45 → 21:15",
      details: {
        flightNumber: "PG263",
        departure: "Bangkok (BKK), 17 Nov 2026, 19:45",
        arrival: "Krabi (KBV), 17 Nov 2026, 21:15",
        bookingRef: "D689IK",
        seats: null, // TODO
        luggage: "20kg checked bag per person",
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "transfer",
      icon: "🚐",
      title: "Krabi Airport → Ananta Burin Resort",
      dateRange: "17 Nov 2026",
      summary: "Private sedan, flagged for PG263 arrival 21:15",
      details: {
        driverContact: "+66 82 780750 / +66 75 661551",
        notes: "Arranged pickup, driver tracks flight arrival time",
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "accommodation",
      icon: "🏨",
      title: "Ananta Burin Resort",
      dateRange: "17–26 Nov 2026",
      summary: "Ao Nang Beach, 9 nights",
      details: {
        location: "Ao Nang Beach, Krabi",
        checkIn: "17 Nov 2026",
        checkOut: "26 Nov 2026",
        bookingRef: null, // TODO
        notes: "Includes 1-night side trip to Railay Beach (see below)",
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "accommodation",
      icon: "🏝️",
      title: "Sand Sea Resort, Railay",
      dateRange: "23–24 Nov 2026",
      summary: "1 night side trip during Ananta Burin stay",
      details: {
        location: "Railay Beach, Krabi",
        checkIn: "23 Nov 2026",
        checkOut: "24 Nov 2026",
        bookingRef: null, // TODO
        notes: "Return to Ananta Burin after this night",
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "tour",
      icon: "🚣",
      title: "Khao Sok \"Smiley\" Lake Tour",
      dateRange: "26–28 Nov 2026",
      summary: "3 days / 2 nights",
      details: {
        startDate: "26 Nov 2026",
        endDate: "28 Nov 2026",
        bookingRef: null, // TODO
        notes: "Transfer arranged: Khao Sok → Surat Thani boat pier included",
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "transfer",
      icon: "⛴️",
      title: "Surat Thani Pier → Koh Samui",
      dateRange: "28 Nov 2026",
      summary: "TODO: boat not yet booked",
      details: {
        notes: "Need to book ferry from Surat Thani pier to Koh Samui separately",
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "accommodation",
      icon: "🏨",
      title: "PS Thana Resort",
      dateRange: "28 Nov – 5 Dec 2026",
      summary: "Choeng Mon Beach, Koh Samui, 7 nights",
      details: {
        location: "Choeng Mon Beach, Koh Samui",
        checkIn: "28 Nov 2026",
        checkOut: "5 Dec 2026",
        bookingRef: null, // TODO
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "transfer",
      icon: "⛴️",
      title: "Koh Samui → Koh Phangan",
      dateRange: "5 Dec 2026",
      summary: "TODO: transport not yet booked",
      details: {
        notes: "Ferry options between Samui and Phangan, not yet arranged",
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "accommodation",
      icon: "🏨",
      title: "Silan Residence",
      dateRange: "5–12 Dec 2026",
      summary: "Chaloklum, Koh Phangan, 7 nights",
      details: {
        location: "37/9 Chaloklum, Koh Phangan, 84280, Thailand",
        checkIn: "5 Dec 2026, 14:00–17:00",
        checkOut: "12 Dec 2026, 08:00–11:00",
        phone: "+66 81 298 9913",
        occupancy: "2 adults, 1 child",
        notes: "Oceanfront home with sea view",
      },
      cost: {
        total: 26050.42,
        currency: "THB",
        paid: 0,
        outstanding: 26050.42,
      },
    },
    {
      type: "flight",
      icon: "✈️",
      title: "Koh Samui → Bangkok",
      dateRange: "12 Dec 2026",
      summary: "PG146",
      details: {
        flightNumber: "PG146",
        departure: "Koh Samui (USM), 12 Dec 2026",
        arrival: "Bangkok (BKK), 12 Dec 2026",
        bookingRef: null, // TODO
        seats: null, // TODO
        luggage: null, // TODO
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "accommodation",
      icon: "🏨",
      title: "57 Hidden House",
      dateRange: "12–15 Dec 2026",
      summary: "Bangkok, Chinatown, 3 nights",
      details: {
        location: "Chinatown, Bangkok",
        checkIn: "12 Dec 2026",
        checkOut: "15 Dec 2026",
        bookingRef: null, // TODO
      },
      cost: { total: null, currency: "THB", paid: null, outstanding: null },
    },
    {
      type: "flight",
      icon: "✈️",
      title: "Bangkok → Gatwick",
      dateRange: "15–16 Dec 2026",
      summary: "BA2230, 23:05 → 05:25 (+1 day)",
      details: {
        flightNumber: "BA2230",
        departure: "Bangkok (BKK), 15 Dec 2026, 23:05",
        arrival: "London Gatwick (T5), 16 Dec 2026, 05:25",
        bookingRef: "YZ7N2A",
        seats: null, // TODO
        luggage: "23kg checked bag per person",
      },
      cost: { total: null, currency: "GBP", paid: null, outstanding: null },
    },
  ],
};