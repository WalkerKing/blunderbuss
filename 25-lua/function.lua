
a = os.clock()
print(a)
--[[
for i = 1,10000000 do
  local x = math.sin(i)
end
b = os.clock()
print(b-a) --1.113454


a = os.clock()
print(a)
local sin = math.sin
for i = 1,10000000 do
  local x = sin(i)
end
b = os.clock()
print(b-a) --0.75951
]]--
