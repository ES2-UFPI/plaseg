export interface municipality {
	name: string;
	guardInitialDate: Date;
	guardCount: number;
	trafficInitialDate: Date;
	trafficCount: number;
	federativeUnit: string;
	unitType: string;
}

export interface qualifiedStaff {
	name: string;
	sector: string;
	education: string;
	experience: string;
	employmentType: string;
	document: string;
	isResponsible: boolean;
}
export interface projectPartnership {
	term: string;
	agency: string;
	objective: string;
	status: string;
}
export interface allocationDepartment {
	description: string;
	address: string;
}
export interface management {
	initialDate: Date;
	endDate: Date;
	managerName: string;
	managerCpf: string;
	managerEmail: string;
	managerAddress: string;
	managerPhone: string;
	adminManagerName: string;
	adminManagerCpf: string;
	adminManagerEmail: string;
	adminManagerAddress: string;
	adminManagerPhone: string;
	legislationName: string;
	legislationCpf: string;
	legislationEmail: string;
	legislationAddress: string;
	legislationPhone: string;
}
export interface maintenanceContract {
	description: string;
	attachment: string;
}
