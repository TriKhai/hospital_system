// import axiosClient from "../config/axios";
// import type { ResponseData } from "../types/resType";
// import type { StaffScheduleReq, StaffScheduleRes } from "../types/staffScheduleType";

// const BASE_URL = "/staff-schedule";

// const staffScheduleService = {
//   getAll: async (): Promise<StaffScheduleRes[]> => {
//     const res = await axiosClient.get<ResponseData<StaffScheduleRes[]>>(BASE_URL);
//     return res.data.data;
//   },

//   create: async (data: StaffScheduleReq): Promise<StaffScheduleRes> => {
//     const res = await axiosClient.post<ResponseData<StaffScheduleRes>>(
//       BASE_URL,
//       data
//     );
//     return res.data.data;
//   },

// //   update: async (
// //     id: number,
// //     data: SupplierRequest
// //   ): Promise<SupplierResponse> => {
// //     const res = await axiosClient.put<ResponseData<SupplierResponse>>(
// //       `${BASE_URL}/${id}`,
// //       data
// //     );
// //     return res.data.data;
// //   },

// //   delete: async (id: number): Promise<void> => {
// //     await axiosClient.delete(`${BASE_URL}/${id}`);
// //   },
// };



// export default staffScheduleService;
