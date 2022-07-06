import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function ImageAvatars() {
	return (
		<Stack direction="row" spacing={2}>
			<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
			<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
			<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
		</Stack>
	);
}


build
				<DivData style={{ overflowX: "auto" }}>
					<Table>
						{viewOrders?.order &&
							viewOrders?.order?.map((props) => (
								<TRHold>
									<td>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												margin: "20px",
												minWidth: "200px",
											}}
										>
											{props.seen ? <NonVisibleIcon /> : <VisibleIcon />}
											<div>
												<div style={{ fontWeight: "700" }}>
													{props.fullName}
												</div>
												<div style={{ fontSize: "12px" }}>
													{props.displayName}
												</div>
											</div>
										</div>
									</td>

									<td
										style={{
											fontSize: "15px",
											padding: "0 15px",
											minWidth: "250px",
											fontSize: "13px",
										}}
									>
										{props.email}
									</td>

									<td
										style={{
											margin: "10px",
											minWidth: "150px",
											paddingLeft: "30px",
											fontSize: "13px",
										}}
									>
										{props.status}
									</td>

									<td
										style={{
											margin: "10px",
											minWidth: "150px",
											paddingLeft: "30px",
											fontSize: "13px",
										}}
									>
										{props.phoneNumber ? (
											<div>{props.phoneNumber}</div>
										) : (
											<div>No Phone Numb. yet</div>
										)}
									</td>

									<td
										style={{
											margin: "10px",
											minWidth: "150px",
											paddingLeft: "10px",
											fontWeight: "500",
											fontSize: "13px",
										}}
									>
										<Active>Active</Active>
									</td>
								</TRHold>
							))}
					</Table>
				</DivData>



<TextHolderFile>
<TextBook>5 Most recent Ebook Orders</TextBook>
build
<DivData style={{ overflowX: "auto" }}>
	<Table>
		<tr
			style={{
				backgroundColor: "#e0e1e2",
				height: "50px",
				paddingRight: "20px",
				paddingLeft: "20px",
			}}
		>
			<th
				style={{
					height: "50px",
					paddingRight: "20px",
					paddingLeft: "20px",
				}}
			>
				SEEN
			</th>
			<th
				style={{
					height: "50px",
					paddingRight: "20px",
					paddingLeft: "20px",
				}}
			>
				STATUS
			</th>
			<th
				style={{
					height: "50px",
					paddingRight: "20px",
					paddingLeft: "20px",
				}}
			>
				PROFILE
			</th>
			<th
				style={{
					height: "50px",
					paddingRight: "20px",
					paddingLeft: "20px",
				}}
			>
				DETAILS
			</th>
		</tr>

		{viewOrders?.order &&
			viewOrders?.order?.map((props) => (
				<TRHold>
					<td>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								margin: "20px",
								minWidth: "200px",
							}}
						>
							{props.seen ? <NonVisibleIcon /> : <VisibleIcon />}
						</div>
					</td>

					<td
						style={{
							fontSize: "15px",
							padding: "0 15px",
							minWidth: "250px",
							fontSize: "13px",
						}}
					>
						{props.delivered ? (
							<Active bg>Deliver</Active>
						) : (
							<Active>Not Deliver</Active>
						)}
					</td>

					<td
						style={{
							margin: "10px",
							minWidth: "150px",
							paddingLeft: "30px",
							fontSize: "13px",
						}}
					>
						{props.who}
					</td>

					<td
						style={{
							margin: "10px",
							minWidth: "150px",
							paddingLeft: "10px",
							fontWeight: "500",
							fontSize: "13px",
						}}
					>
						<Named>{props.what}</Named>
						<DisplayNamed>{props.detail}</DisplayNamed>
						<CostOrder>#{props.cost}.00</CostOrder>
					</td>
				</TRHold>
			))}
	</Table>
</DivData>
{/* <MinCard1>
		<Header fs>
			<SeenVisible>Seen</SeenVisible>
			<Seen>Status</Seen>
			<Detailed>Profile</Detailed>
			<Status>Details</Status>
		</Header>

		{viewOrders?.order &&
			viewOrders?.order?.map((props) => (
				<Header key={props._id}>
					<SeenVisible>
						{props.seen ? <NonVisibleIcon /> : <VisibleIcon />}
					</SeenVisible>
					<Seen>
						{props.delivered ? (
							<Active bg>Deliver</Active>
						) : (
							<Active>Not Deliver</Active>
						)}
					</Seen>
					<Detailed>
						<Named>{props.who}</Named>
						<DisplayNamed>{}</DisplayNamed>
					</Detailed>
					<Status>
						<Named>{props.what}</Named>
						<DisplayNamed>{props.detail}</DisplayNamed>
						<CostOrder>#{props.cost}.00</CostOrder>
					</Status>
				</Header>
			))}
	</MinCard1> */}
</TextHolderFile>