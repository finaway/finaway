import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { ContentWrapper } from 'app/components/ContentWrapper';
import { selectAuth } from 'app/global-stores/auth/selectors';
import { useAppBarTitle } from 'app/hooks/useAppBarTitle';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomePageSlice } from './slice/selectors';
import { useHomePageSlice } from './slice';
import { formatCurrency } from 'utils/currency';
import Skeleton from '@mui/material/Skeleton';

export function HomePage() {
  useAppBarTitle('Home');

  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const { loadings, ...data } = useSelector(selectHomePageSlice);
  const { actions } = useHomePageSlice();

  const [activeTab, setActiveTab] = React.useState<
    'weekly' | 'monthly' | 'yearly'
  >('weekly');

  const currentIncomeByTab = React.useMemo(() => {
    switch (activeTab) {
      case 'weekly':
        return {
          total_income: data.weekly_income,
          total_expenses: data.weekly_expenses,
        };
      case 'monthly':
        return {
          total_income: data.monthly_income,
          total_expenses: data.monthly_expenses,
        };
      case 'yearly':
        return {
          total_income: data.yearly_income,
          total_expenses: data.yearly_expenses,
        };
      default:
        return { total_income: 0, total_expense: 0 };
    }
  }, [activeTab, data]);

  useEffect(() => {
    switch (activeTab) {
      case 'weekly':
        dispatch(actions.getWeekly());
        break;
      case 'monthly':
        dispatch(actions.getMonthly());
        break;
      case 'yearly':
        dispatch(actions.getYearly());
        break;
      default:
        break;
    }
  }, [actions, activeTab, dispatch]);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <ContentWrapper>
        <Typography variant="body2" sx={{ fontWeight: 'light' }}>
          Welcome Back
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {user!.name}
        </Typography>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <Typography variant="h5" sx={{ fontWeight: 'normal' }}>
                  Expenses
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 'light' }}>
                  1 April - 30 April
                </Typography>
              </div>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold' }}
                color="error"
              >
                Rp250.000,00
              </Typography>
            </Grid>
          </CardContent>
        </Card>

        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="center"
          gap={1}
          sx={{ mt: 3 }}
        >
          <Button
            variant={activeTab === 'weekly' ? 'contained' : 'outlined'}
            color="primary"
            size="small"
            sx={{ borderRadius: 5, textTransform: 'none' }}
            onClick={() => setActiveTab('weekly')}
          >
            This Week
          </Button>

          <Button
            variant={activeTab === 'monthly' ? 'contained' : 'outlined'}
            color="primary"
            size="small"
            sx={{ borderRadius: 5, textTransform: 'none' }}
            onClick={() => setActiveTab('monthly')}
          >
            This Month
          </Button>

          <Button
            variant={activeTab === 'yearly' ? 'contained' : 'outlined'}
            color="primary"
            size="small"
            sx={{ borderRadius: 5, textTransform: 'none' }}
            onClick={() => setActiveTab('yearly')}
          >
            This Year
          </Button>
        </Grid>

        <Grid container columnSpacing={1} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 'light' }}>
                  Income
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'normal' }}
                  color={green[800]}
                >
                  {typeof currentIncomeByTab.total_income === 'number' ? (
                    <>+{formatCurrency(currentIncomeByTab.total_income || 0)}</>
                  ) : (
                    <Skeleton variant="rectangular" height={25} />
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 'light' }}>
                  Expenses
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'normal' }}
                  color="error"
                >
                  {typeof currentIncomeByTab.total_expenses === 'number' ? (
                    <>
                      -{formatCurrency(currentIncomeByTab.total_expenses || 0)}
                    </>
                  ) : (
                    <Skeleton variant="rectangular" height={25} />
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ContentWrapper>
    </>
  );
}
