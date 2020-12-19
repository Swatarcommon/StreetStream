using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AddedSubscriptionsmodelthatmadereferencesmanytomanybeetwenRegularandCommercial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    RegularAccountId = table.Column<long>(nullable: false),
                    CommercialAccountId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => new { x.RegularAccountId, x.CommercialAccountId });
                    table.ForeignKey(
                        name: "FK_Subscriptions_CommercialAccounts_CommercialAccountId",
                        column: x => x.CommercialAccountId,
                        principalTable: "CommercialAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Subscriptions_RegularAccounts_RegularAccountId",
                        column: x => x.RegularAccountId,
                        principalTable: "RegularAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_CommercialAccountId",
                table: "Subscriptions",
                column: "CommercialAccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Subscriptions");
        }
    }
}
