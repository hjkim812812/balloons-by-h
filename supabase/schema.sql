create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number integer unique not null,
  name text not null,
  email text not null,
  phone text not null,
  delivery_address text not null,
  delivery_date date not null,
  delivery_time text not null,
  items jsonb not null,
  total numeric not null,
  created_at timestamptz default now()
);

create index if not exists orders_order_number_idx on orders (order_number);
