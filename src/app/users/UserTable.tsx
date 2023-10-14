import User, {UserOrderBy} from "@/app/common/users/User";

interface Props {
    users: User[],
    orderBy: UserOrderBy | null
    onOrderBy: (orderBy: UserOrderBy) => void
}

export default function UserTable ({ users, orderBy, onOrderBy }: Props) {

    function OrderByLink({ targetOrderBy, children }) {
        if (targetOrderBy == orderBy) {
            return <span className="text-black">{children}</span>
        }

        return <span
            onClick={() => onOrderBy(targetOrderBy)}
            className="link">
            {children}
        </span>
    }

    return <table className="table table-zebra">
        <thead>
            <tr>
                <th>
                    <OrderByLink targetOrderBy={UserOrderBy.FirstName}>
                        First name
                    </OrderByLink>
                </th>
                <th>
                    <OrderByLink targetOrderBy={UserOrderBy.LastName}>
                        Last name
                    </OrderByLink>
                </th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user =>
                <tr key={user.id} className="hover">
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                </tr>
            )}
        </tbody>
    </table>
}
