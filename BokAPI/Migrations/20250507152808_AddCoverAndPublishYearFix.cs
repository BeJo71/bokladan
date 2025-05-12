using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BokAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCoverAndPublishYearFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CoverId",
                table: "Books",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PublishYear",
                table: "Books",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "PublishYear",
                table: "Books");
        }
    }
}
