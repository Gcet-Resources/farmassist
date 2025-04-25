
import { useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  DollarSign, 
  TrendingUp, 
  ArrowDownRight, 
  ArrowUpRight,
  Landmark,
  Target,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  source: string;
  category?: string;
}

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  endDate: string;
}

const Finance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "income", amount: 2500, date: "2023-05-10", source: "Crop Sales" },
    { id: "2", type: "expense", amount: 450, date: "2023-05-12", source: "Equipment Maintenance", category: "Operations" },
    { id: "3", type: "expense", amount: 200, date: "2023-05-15", source: "Seeds", category: "Supplies" },
    { id: "4", type: "income", amount: 1200, date: "2023-05-20", source: "Govt. Subsidy" },
    { id: "5", type: "expense", amount: 300, date: "2023-05-22", source: "Fertilizer", category: "Supplies" },
    { id: "6", type: "income", amount: 900, date: "2023-05-25", source: "Milk Sales" },
  ]);
  
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      name: "New Tractor",
      targetAmount: 15000,
      currentAmount: 7500,
      endDate: "2023-12-31",
    },
    {
      id: "2",
      name: "Irrigation System",
      targetAmount: 5000,
      currentAmount: 1200,
      endDate: "2023-10-15",
    }
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: "income",
    amount: "",
    source: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netBalance = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.source) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amount = parseFloat(newTransaction.amount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const newTx: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type as 'income' | 'expense',
      amount: amount,
      source: newTransaction.source,
      date: newTransaction.date,
    };

    setTransactions([newTx, ...transactions]);
    
    setNewTransaction({
      type: "income",
      amount: "",
      source: "",
      date: new Date().toISOString().slice(0, 10),
    });
    
    toast.success("Transaction added successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-6">Finance Tracker</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">${totalIncome.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ArrowDownRight className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-2xl font-bold">${totalExpenses.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Net Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  {netBalance >= 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(netBalance).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="savings">Savings Goals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <div className="grid md:grid-cols-12 gap-6">
                <Card className="md:col-span-5">
                  <CardHeader>
                    <CardTitle>Add Transaction</CardTitle>
                    <CardDescription>
                      Record your income and expenses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Type</Label>
                          <select
                            id="type"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            value={newTransaction.type}
                            onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                          >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <div className="relative">
                            <DollarSign className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input 
                              id="amount"
                              placeholder="0.00"
                              type="number"
                              className="pl-10" 
                              value={newTransaction.amount}
                              onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="source">
                          {newTransaction.type === 'income' ? 'Source' : 'Description'}
                        </Label>
                        <Input
                          id="source"
                          placeholder={newTransaction.type === 'income' ? 'Crop sales, subsidy, etc.' : 'Seeds, equipment, etc.'}
                          value={newTransaction.source}
                          onChange={(e) => setNewTransaction({...newTransaction, source: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newTransaction.date}
                          onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                        />
                      </div>
                      
                      <Button
                        className="w-full bg-farm-600 hover:bg-farm-700"
                        onClick={handleAddTransaction}
                      >
                        Add Transaction
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-7">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Your financial activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <DollarSign className="mx-auto h-8 w-8 opacity-30 mb-2" />
                        <p>No transactions yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {transactions.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-full mr-3 ${
                                tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                {tx.type === 'income' ? (
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{tx.source}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                              </div>
                            </div>
                            <div className={`font-medium ${
                              tx.type === 'income' ? 'text-green-600' : 'text-red-600'  
                            }`}>
                              {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="savings">
              <div className="grid md:grid-cols-12 gap-6">
                <Card className="md:col-span-5">
                  <CardHeader>
                    <CardTitle>Add Savings Goal</CardTitle>
                    <CardDescription>
                      Set financial targets for your farm
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button 
                        className="w-full flex items-center gap-2" 
                        variant="outline"
                        onClick={() => toast.info("Savings goals feature coming soon!")}
                      >
                        <Plus className="h-4 w-4" /> Create New Goal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-7">
                  <CardHeader>
                    <CardTitle>Your Savings Goals</CardTitle>
                    <CardDescription>
                      Track your financial objectives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {savingsGoals.map((goal) => {
                        const progress = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
                        
                        return (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Target className="h-4 w-4 text-farm-600" />
                                  <h4 className="font-medium">{goal.name}</h4>
                                </div>
                                <p className="text-sm text-gray-500">Target: ${goal.targetAmount.toFixed(2)} by {goal.endDate}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${goal.currentAmount.toFixed(2)}</p>
                                <p className="text-xs text-gray-500">{progress}% complete</p>
                              </div>
                            </div>
                            
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-farm-600 h-2 rounded-full" 
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Finance;
