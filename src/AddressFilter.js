export const applyFilter = (employees, selectedAddress, filterLevel, searchQuery = "") => {
    if (!Array.isArray(employees)) {
        console.error("applyFilter Error: employees is not an array", employees);
        return [];
    }

    if (!selectedAddress) return employees;

    const parsedAddress = parseAddress(selectedAddress);
    // console.log("Parsed Selected Address:", parsedAddress);

    if (filterLevel === 6) {
        return employees.filter(emp =>
            emp.name?.S.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.address?.S.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.work?.S.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.contact_number?.S.includes(searchQuery)
        );
    }

    let filteredEmployees = employees.filter(employee => {
        if (!employee.address?.S) return false;

        const employeeAddress = parseAddress(employee.address.S);
        // console.log("Comparing with Employee Address:", employeeAddress);

        switch (filterLevel) {
            case 1:
                return (
                    employeeAddress.area === parsedAddress.area &&
                    employeeAddress.city === parsedAddress.city &&
                    employeeAddress.district === parsedAddress.district &&
                    employeeAddress.state === parsedAddress.state
                );
            case 2:
                return (
                    employeeAddress.city === parsedAddress.city &&
                    employeeAddress.district === parsedAddress.district &&
                    employeeAddress.state === parsedAddress.state
                );
            case 3:
                return (
                    employeeAddress.district === parsedAddress.district &&
                    employeeAddress.state === parsedAddress.state
                );
            case 4:
                return employeeAddress.state === parsedAddress.state;
            case 5:
                return (
                    employeeAddress.area === parsedAddress.area ||
                    employeeAddress.city === parsedAddress.city ||
                    employeeAddress.district === parsedAddress.district
                );
            default:
                return false;
        }
    });

    if (searchQuery.trim()) {
        filteredEmployees = filteredEmployees.filter(emp =>
            emp.name?.S.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.address?.S.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.work?.S.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.contact_number?.S.includes(searchQuery)
        );
    }

    return filteredEmployees;
};

export const parseAddress = (address) => {
    if (!address) return {};
    const parts = address.split(',').map(item => item.trim());
    return {
        doorNumber: parts[0] || '',
        area: parts[1] || '',
        city: parts[2] || '',
        district: parts[3] || '',
        state: parts[4] || '',
        pincode: parts[5] || ''
    };
};


