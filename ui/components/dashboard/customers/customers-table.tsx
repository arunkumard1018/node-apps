"use client"
import { getCustomersList } from "@/api/customers"
import { TableComponent } from "@/components/table-def/TableComponent"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { setCustomers } from "@/store/slices/customersSlice"
import { RootState } from "@/store/store"
import { ApiResponse } from "@/types/api-responses"
import { Customers } from "@/types/definetions"
import { File, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Customerscolumns } from "./customers-column"


export default function CustomersTable() {
    const storeState = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const businessId = storeState.authContext.activeBusiness._id;
    const CustomersList = storeState.customers;
    useEffect(() => {
        const loadCustomers = async (Id: string) => {
            try {
                const customers: ApiResponse<Customers[]> = await getCustomersList(Id);
                if (customers.result) {
                    dispatch(setCustomers(customers.result));
                }
            } catch (error: unknown) {
                console.log((error as Error).message);
            }
        };
        loadCustomers(businessId);
    }, [businessId, dispatch]);

    if (!CustomersList) return <div className="text-center mt-10">Loading...</div>
    return (
        <div className="flex flex-col sm:py-4">
            <div className="grid flex-1 items-start gap-4 px-0 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center mx-2">

                        <div className="ml-auto flex items-center gap-2">

                            <Button size="sm" variant="outline" className="h-7 gap-1 rounded-none">
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>

                            <Link href="customers/add-customers">
                                <Button size="sm" className="h-7 gap-1 rounded-none">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sm:not-sr-only sm:whitespace-nowrap">
                                        Add New Customer
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <TableComponent columns={Customerscolumns} data={CustomersList} heading="Customers Details" headingInfo="Manage You're Customers"
                        smHiddenCells={["GSTIN", "PAN", "email"]}
                        isSearchInputRequired={false}
                        searchInputValue=""
                        key={CustomersList.length}
                        isSelectAvailable={false} />
                </Tabs>
            </div>
        </div>
    )
}
