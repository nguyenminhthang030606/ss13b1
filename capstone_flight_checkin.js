let tickets = [
    {
        pnr: "VN001",
        customerName: "Nguyen Van A",
        flight: "VN123",
        ticketClass: "ECONOMY",
        status: "BOOKED"
    },
    {
        pnr: "VN002",
        customerName: "Tran Thi B",
        flight: "VN456",
        ticketClass: "BUSINESS",
        status: "BOOKED"
    },
    {
        pnr: "VN003",
        customerName: "Le Van C",
        flight: "VN789",
        ticketClass: "ECONOMY",
        status: "BOOKED"
    }
];

function listTickets() {
    console.log("\n===== DANH SÁCH VÉ =====");

    console.table(
        tickets.map(ticket => ({
            PNR: ticket.pnr,
            HanhKhach: ticket.customerName,
            ChuyenBay: ticket.flight,
            HangVe: ticket.ticketClass,
            TrangThai: ticket.status
        }))
    );
}

function findTicketByPnr(pnr) {
    return tickets.find(ticket => ticket.pnr === pnr);
}

function findTicketByName(name) {
    return tickets.filter(ticket =>
        ticket.customerName.toLowerCase().includes(name.toLowerCase())
    );
}

function calculateExcessBaggageFee(ticketClass, baggageWeight) {
    let freeAllowance = 0;

    if (ticketClass === "ECONOMY") {
        freeAllowance = 20;
    } else if (ticketClass === "BUSINESS") {
        freeAllowance = 30;
    }

    let excessKg = Math.max(0, baggageWeight - freeAllowance);

    return excessKg * 50000;
}

function displayBoardingPass(ticket) {
    console.log("\n==============================");
    console.log("      BOARDING PASS");
    console.log("==============================");
    console.log("PNR:", ticket.pnr);
    console.log("Hành khách:", ticket.customerName);
    console.log("Chuyến bay:", ticket.flight);
    console.log("Hạng vé:", ticket.ticketClass);
    console.log("Trạng thái:", ticket.status);
    console.log("==============================");
}

function checkIn() {
    let pnr = prompt("Nhập mã PNR:");

    let ticket = findTicketByPnr(pnr);

    if (!ticket) {
        console.log("Không tìm thấy vé!");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Vé đã bị hủy!");
        return;
    }

    if (ticket.status === "CHECKED_IN") {
        console.log("Hành khách đã check-in!");
        return;
    }

    let baggageWeight = Number(
        prompt("Nhập cân nặng hành lý (kg):")
    );

    if (isNaN(baggageWeight) || baggageWeight < 0) {
        console.log("Cân nặng không hợp lệ!");
        return;
    }

    let fee = calculateExcessBaggageFee(
        ticket.ticketClass,
        baggageWeight
    );

    console.log("\n===== KẾT QUẢ CHECK-IN =====");
    console.log("Hành lý:", baggageWeight, "kg");
    console.log("Phí quá cân:", fee.toLocaleString(), "VNĐ");

    ticket.status = "CHECKED_IN";

    displayBoardingPass(ticket);
}

function searchTicket() {
    let choice = Number(
        prompt("1. Tra theo PNR\n2. Tra theo tên\nChọn:")
    );

    if (choice === 1) {
        let pnr = prompt("Nhập mã PNR:");

        let ticket = findTicketByPnr(pnr);

        if (ticket) {
            console.table([ticket]);
        } else {
            console.log("Không tìm thấy vé!");
        }
    } else if (choice === 2) {
        let name = prompt("Nhập tên khách:");

        let result = findTicketByName(name);

        if (result.length > 0) {
            console.table(result);
        } else {
            console.log("Không tìm thấy vé!");
        }
    }
}

function cancelTicket() {
    let pnr = prompt("Nhập PNR cần hủy:");

    let ticket = findTicketByPnr(pnr);

    if (!ticket) {
        console.log("Không tìm thấy vé!");
        return;
    }

    if (ticket.status === "CHECKED_IN") {
        console.log("Không thể hủy vé đã check-in!");
        return;
    }

    ticket.status = "CANCELLED";

    console.log("Hủy vé thành công!");
}

function main() {
    let menuChoice;

    do {
        menuChoice = Number(
            prompt(
                "===== HỆ THỐNG CHECK-IN =====\n" +
                "1. Hiển thị danh sách vé\n" +
                "2. Check-in hành khách\n" +
                "3. Tra cứu vé\n" +
                "4. Hủy vé\n" +
                "5. Thoát\n" +
                "Chọn chức năng:"
            )
        );

        switch (menuChoice) {
            case 1:
                listTickets();
                break;

            case 2:
                checkIn();
                break;

            case 3:
                searchTicket();
                break;

            case 4:
                cancelTicket();
                break;

            case 5:
                console.log("Kết thúc chương trình.");
                break;

            default:
                console.log("Lựa chọn không hợp lệ!");
        }
    } while (menuChoice !== 5);
}

main();