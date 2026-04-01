"""update users table with password hash

Revision ID: a1e446dd2f4e
Revises: 770529b99e8c
Create Date: 2026-03-30 01:53:11.787251
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'a1e446dd2f4e'
down_revision: Union[str, None] = '770529b99e8c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'app_user',
        sa.Column('password_hash', sa.String(length=255), nullable=True)
    )


def downgrade() -> None:
    op.drop_column('app_user', 'password_hash')