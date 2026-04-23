"""add is admin user table

Revision ID: 8011397a3509
Revises: b2fb0b933984
Create Date: 2026-04-22 01:55:32.291411

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8011397a3509'
down_revision: Union[str, None] = 'b2fb0b933984'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "app_user",
        sa.Column("is_admin", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.alter_column("app_user", "is_admin", server_default=None)


def downgrade() -> None:
    op.drop_column("app_user", "is_admin")
